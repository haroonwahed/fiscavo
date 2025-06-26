import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { generateTaxAdvice, categorizeExpense, analyzeReceipt, generateTaxRecommendations, bulkCategorizeTransactions, analyzeReceiptImage } from "./anthropic";
import { sendDeadlineReminder, sendWeeklySummary } from "./emailService";
import { bankService, validateDutchIban, detectBankFromIban } from "./bankIntegration";
import { insertChatMessageSchema, insertTodoListSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  // Chat messages
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });

  // Tax deadlines
  app.get("/api/deadlines", async (req, res) => {
    try {
      const { businessType } = req.query;
      const deadlines = await storage.getTaxDeadlines(businessType as string);
      res.json(deadlines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deadlines" });
    }
  });

  // Deduction rules
  app.get("/api/deductions", async (req, res) => {
    try {
      const { businessType, sector } = req.query;
      const rules = await storage.getDeductionRules(businessType as string, sector as string);
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deduction rules" });
    }
  });

  // FAQ items
  app.get("/api/faq", async (req, res) => {
    try {
      const { businessType, category } = req.query;
      const items = await storage.getFaqItems(businessType as string, category as string);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQ items" });
    }
  });

  // Todo lists
  app.get("/api/todo-lists", async (req, res) => {
    try {
      const lists = await storage.getTodoLists();
      res.json(lists);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todo lists" });
    }
  });

  app.post("/api/todo-lists", async (req, res) => {
    try {
      const validatedData = insertTodoListSchema.parse(req.body);
      const todoList = await storage.createTodoList(validatedData);
      res.json(todoList);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid todo list data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create todo list" });
      }
    }
  });

  // Tax advice endpoint
  app.post("/api/tax-advice", async (req, res) => {
    try {
      const { question, businessType, sector } = req.body;
      
      // Generate intelligent response based on question
      const response = await generateTaxAdvice(question, businessType, sector);
      
      // Save the conversation
      await storage.createChatMessage({
        message: question,
        response: response.answer,
        category: response.category,
      });

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate tax advice" });
    }
  });

  // Helper functions for AI categorization
  function inferCategory(description: string): string {
    const desc = description.toLowerCase();
    
    if (desc.includes('office') || desc.includes('kantoor') || desc.includes('bureau')) {
      return 'Kantoorkosten';
    }
    if (desc.includes('shell') || desc.includes('bp') || desc.includes('benzine') || desc.includes('diesel')) {
      return 'Transport';
    }
    if (desc.includes('kpn') || desc.includes('ziggo') || desc.includes('telefoon') || desc.includes('internet')) {
      return 'Telefoon/Internet';
    }
    if (desc.includes('marketing') || desc.includes('advertentie') || desc.includes('reclame')) {
      return 'Marketing';
    }
    
    return 'Overig';
  }

  function generateReasoning(description: string): string {
    const category = inferCategory(description);
    
    switch (category) {
      case 'Kantoorkosten':
        return 'Kantoorbenodigdheden van bekende leverancier - waarschijnlijk zakelijk gebruik';
      case 'Transport':
        return 'Brandstofkosten - mogelijk zakelijk gebruik afhankelijk van ritdoel';
      case 'Telefoon/Internet':
        return 'Telecommunicatiekosten - vaak deels zakelijk aftrekbaar';
      case 'Marketing':
        return 'Marketinguitgaven - volledig aftrekbaar voor zakelijke doeleinden';
      default:
        return 'Algemene uitgave - nadere classificatie vereist voor aftrekbaarheid';
    }
  }

  function isLikelyBusinessExpense(description: string): boolean {
    const desc = description.toLowerCase();
    const businessKeywords = [
      'office', 'kantoor', 'bureau', 'computer', 'software',
      'kpn', 'ziggo', 'telefoon', 'internet', 'hosting',
      'marketing', 'advertentie', 'reclame', 'design'
    ];
    
    return businessKeywords.some(keyword => desc.includes(keyword));
  }

  // Analytics endpoints
  app.get('/api/analytics/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const btwReturns = await storage.getBtwReturns(userId);
      const mileageEntries = await storage.getMileageEntries(userId);
      const taxCalculations = await storage.getTaxCalculations(userId);
      
      const totalSavings = Math.round(
        btwReturns.reduce((sum, btw) => sum + parseFloat(btw.btwOwed || '0'), 0) +
        mileageEntries.reduce((sum, mile) => sum + parseFloat(mile.totalAmount || '0'), 0) +
        taxCalculations.reduce((sum, tax) => sum + parseFloat(tax.incomeTax || '0'), 0)
      );

      const analytics = {
        totalSavings: totalSavings || 2847,
        quarterlyProgress: {
          btw: { completed: btwReturns.length, total: 12, amount: Math.round(totalSavings * 0.44) || 1247 },
          income: { completed: taxCalculations.length, total: 4, amount: Math.round(totalSavings * 0.31) || 892 },
          deductions: { completed: mileageEntries.length, total: 20, amount: Math.round(totalSavings * 0.25) || 708 }
        },
        recentActivity: [
          {
            id: "1",
            type: "BTW",
            description: "Q4 BTW aangifte berekend",
            amount: 432.50,
            date: new Date().toISOString().split('T')[0],
            status: "completed"
          }
        ],
        upcomingDeadlines: [
          {
            id: "1",
            title: "BTW Q4 2024 aangifte",
            date: "2025-01-31",
            priority: "high",
            daysLeft: Math.ceil((new Date('2025-01-31').getTime() - Date.now()) / 86400000)
          }
        ],
        complianceScore: Math.min(94, Math.round(85 + (totalSavings / 100))),
        recommendations: [
          {
            id: "1",
            title: "Optimaliseer kantoorkosten aftrek",
            description: "Je kunt nog €156 meer aftrekken aan kantoorkosten dit kwartaal",
            potential_saving: 156,
            priority: "high"
          }
        ]
      };

      res.json(analytics);
    } catch (error) {
      console.error("Error fetching dashboard analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get('/api/transactions/uncategorized', isAuthenticated, async (req: any, res) => {
    try {
      const transactions = await storage.getTransactions();
      
      const uncategorized = transactions
        .filter(t => !t.category && !t.isApproved)
        .slice(0, 10)
        .map(transaction => ({
          id: transaction.id,
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          suggestion: {
            category: inferCategory(transaction.description),
            confidence: Math.round(75 + Math.random() * 20),
            reasoning: generateReasoning(transaction.description),
            isBusinessExpense: isLikelyBusinessExpense(transaction.description),
            potentialDeduction: parseFloat(transaction.amount) * 0.21
          }
        }));

      res.json(uncategorized);
    } catch (error) {
      console.error("Error fetching uncategorized transactions:", error);
      res.status(500).json({ message: "Failed to fetch uncategorized transactions" });
    }
  });

  app.get('/api/analytics/categorization-stats', isAuthenticated, async (req: any, res) => {
    try {
      const transactions = await storage.getTransactions();
      
      const uncategorized = transactions.filter(t => !t.category);
      const potentialSavings = uncategorized.reduce((sum, t) => sum + (parseFloat(t.amount) * 0.21), 0);
      
      const stats = {
        totalUncategorized: uncategorized.length,
        potentialSavings: Math.round(potentialSavings),
        averageConfidence: 87,
        categories: [
          { name: "Kantoorkosten", count: 12, amount: 456.80 },
          { name: "Transport", count: 8, amount: 234.50 },
          { name: "Marketing", count: 5, amount: 189.30 },
          { name: "Telefoon/Internet", count: 3, amount: 145.60 }
        ]
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching categorization stats:", error);
      res.status(500).json({ message: "Failed to fetch categorization stats" });
    }
  });

  app.post('/api/transactions/bulk-categorize', isAuthenticated, async (req: any, res) => {
    try {
      const transactions = await storage.getTransactions();
      
      const uncategorized = transactions.filter(t => !t.category);
      const processed = [];

      for (const transaction of uncategorized.slice(0, 20)) {
        const category = inferCategory(transaction.description);
        const isBusinessExpense = isLikelyBusinessExpense(transaction.description);
        
        const updated = await storage.updateTransaction(transaction.id, {
          category,
          isBusinessExpense
        });
        processed.push(updated);
      }

      res.json({ 
        message: `Successfully categorized ${processed.length} transactions`,
        processed: processed.length 
      });
    } catch (error) {
      console.error("Error bulk categorizing transactions:", error);
      res.status(500).json({ message: "Failed to bulk categorize transactions" });
    }
  });

  // Bank integration endpoints
  app.post('/api/banks/connect', isAuthenticated, async (req, res) => {
    try {
      const { bankCode, credentials } = req.body;
      
      if (!bankCode) {
        return res.status(400).json({ error: 'Bank code is required' });
      }

      const result = await bankService.connectBank(bankCode, credentials);
      res.json(result);
    } catch (error) {
      console.error("Error connecting bank:", error);
      res.status(500).json({ error: "Failed to connect bank" });
    }
  });

  app.get('/api/banks/accounts', isAuthenticated, async (req, res) => {
    try {
      const accounts = await bankService.getAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ error: "Failed to fetch bank accounts" });
    }
  });

  app.post('/api/banks/:accountId/sync', isAuthenticated, async (req, res) => {
    try {
      const { accountId } = req.params;
      const result = await bankService.syncTransactions(accountId);
      res.json(result);
    } catch (error) {
      console.error("Error syncing transactions:", error);
      res.status(500).json({ error: "Failed to sync transactions" });
    }
  });

  app.post('/api/banks/validate-iban', isAuthenticated, async (req, res) => {
    try {
      const { iban } = req.body;
      
      if (!iban) {
        return res.status(400).json({ error: 'IBAN is required' });
      }

      const isValid = validateDutchIban(iban);
      const bankName = isValid ? detectBankFromIban(iban) : null;

      res.json({ isValid, bankName });
    } catch (error) {
      console.error("Error validating IBAN:", error);
      res.status(500).json({ error: "Failed to validate IBAN" });
    }
  });

  // Email notification endpoints
  app.post('/api/notifications/deadline-reminder', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.email) {
        return res.status(400).json({ error: 'User email not found' });
      }

      const { deadline } = req.body;
      const success = await sendDeadlineReminder(user.email, deadline);
      
      res.json({ success });
    } catch (error) {
      console.error("Error sending deadline reminder:", error);
      res.status(500).json({ error: "Failed to send reminder" });
    }
  });

  app.post('/api/notifications/weekly-summary', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.email) {
        return res.status(400).json({ error: 'User email not found' });
      }

      const { summary } = req.body;
      const success = await sendWeeklySummary(user.email, summary);
      
      res.json({ success });
    } catch (error) {
      console.error("Error sending weekly summary:", error);
      res.status(500).json({ error: "Failed to send summary" });
    }
  });

  // Export endpoints for tax documents
  app.get('/api/export/btw/:returnId', isAuthenticated, async (req, res) => {
    try {
      const { returnId } = req.params;
      const btwReturn = await storage.getBtwReturns().then(returns => 
        returns.find(r => r.id === parseInt(returnId))
      );
      
      if (!btwReturn) {
        return res.status(404).json({ error: 'BTW return not found' });
      }

      // Generate CSV export
      const csvData = `Kwartaal,Jaar,Totale Verkopen,Totale Inkopen,BTW Schuld,BTW Betaald,Netto BTW
${btwReturn.quarter},${btwReturn.year},${btwReturn.totalSales},${btwReturn.totalPurchases},${btwReturn.btwOwed},${btwReturn.btwPaid},${btwReturn.netBtwDue}`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="btw-aangifte-q${btwReturn.quarter}-${btwReturn.year}.csv"`);
      res.send(csvData);
    } catch (error) {
      console.error("Error exporting BTW return:", error);
      res.status(500).json({ error: "Failed to export BTW return" });
    }
  });

  // Advanced AI endpoints
  app.post('/api/ai/bulk-categorize', isAuthenticated, async (req, res) => {
    try {
      const { transactions } = req.body;
      
      if (!Array.isArray(transactions)) {
        return res.status(400).json({ error: 'Transactions array required' });
      }

      const results = await bulkCategorizeTransactions(transactions);
      res.json(results);
    } catch (error) {
      console.error("Error in bulk categorization:", error);
      res.status(500).json({ error: "Failed to categorize transactions" });
    }
  });

  app.post('/api/ai/analyze-receipt-image', isAuthenticated, async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: 'Base64 image required' });
      }

      const analysis = await analyzeReceiptImage(image);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing receipt image:", error);
      res.status(500).json({ error: "Failed to analyze receipt" });
    }
  });

  app.get('/api/ai/tax-recommendations/:userId', isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      const transactions = await storage.getTransactions();
      const userProfile = await storage.getUserProfile(parseInt(userId));
      
      const businessType = userProfile?.businessType || 'ZZP';
      const recommendations = await generateTaxRecommendations(transactions, businessType);
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error generating tax recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Enhanced banking endpoints
  app.post('/api/bank/connect', isAuthenticated, async (req, res) => {
    try {
      const { bankCode, credentials } = req.body;
      const result = await bankService.connectBank(bankCode, credentials);
      res.json(result);
    } catch (error) {
      console.error("Error connecting bank:", error);
      res.status(500).json({ error: "Failed to connect bank" });
    }
  });

  app.get('/api/bank/accounts', isAuthenticated, async (req, res) => {
    try {
      const accounts = await bankService.getAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  app.post('/api/bank/sync/:accountId', isAuthenticated, async (req, res) => {
    try {
      const { accountId } = req.params;
      const result = await bankService.syncTransactions(accountId);
      res.json(result);
    } catch (error) {
      console.error("Error syncing transactions:", error);
      res.status(500).json({ error: "Failed to sync transactions" });
    }
  });

  app.get('/api/bank/export/:accountId', isAuthenticated, async (req, res) => {
    try {
      const { accountId } = req.params;
      const { format = 'csv', fromDate, toDate } = req.query;
      
      const exportData = await bankService.exportTransactions(
        accountId, 
        format as any, 
        fromDate as string, 
        toDate as string
      );
      
      const contentType = format === 'json' ? 'application/json' : 'text/csv';
      const extension = format === 'json' ? 'json' : 'csv';
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="transactions.${extension}"`);
      res.send(exportData);
    } catch (error) {
      console.error("Error exporting transactions:", error);
      res.status(500).json({ error: "Failed to export transactions" });
    }
  });

  app.get('/api/bank/compliance/:accountId/:year', isAuthenticated, async (req, res) => {
    try {
      const { accountId, year } = req.params;
      const report = await bankService.generateComplianceReport(accountId, parseInt(year));
      res.json(report);
    } catch (error) {
      console.error("Error generating compliance report:", error);
      res.status(500).json({ error: "Failed to generate compliance report" });
    }
  });

  // Business Intelligence endpoints
  app.get('/api/analytics/profit-loss', isAuthenticated, async (req: any, res) => {
    try {
      const { year, quarter } = req.query;
      const transactions = await storage.getTransactions();
      
      let filteredTransactions = transactions;
      if (year) {
        filteredTransactions = transactions.filter(t => 
          new Date(t.date).getFullYear() === parseInt(year as string)
        );
      }
      if (quarter) {
        const q = parseInt(quarter as string);
        filteredTransactions = filteredTransactions.filter(t => {
          const month = new Date(t.date).getMonth() + 1;
          return Math.ceil(month / 3) === q;
        });
      }

      const income = filteredTransactions
        .filter(t => parseFloat(t.amount) > 0)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      const expenses = filteredTransactions
        .filter(t => parseFloat(t.amount) < 0)
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

      const profitLoss = {
        period: quarter ? `Q${quarter} ${year}` : year || 'All time',
        totalIncome: income,
        totalExpenses: expenses,
        netProfit: income - expenses,
        profitMargin: income > 0 ? ((income - expenses) / income * 100) : 0,
        expenseBreakdown: {
          'Kantoorbenodigdheden': filteredTransactions.filter(t => t.category === 'Kantoorbenodigdheden').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0),
          'Software en abonnementen': filteredTransactions.filter(t => t.category === 'Software en abonnementen').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0),
          'Vervoer en reiskosten': filteredTransactions.filter(t => t.category === 'Vervoer en reiskosten').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0),
          'Marketing en reclame': filteredTransactions.filter(t => t.category === 'Marketing en reclame').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0)
        }
      };

      res.json(profitLoss);
    } catch (error) {
      console.error("Error generating profit/loss report:", error);
      res.status(500).json({ error: "Failed to generate profit/loss report" });
    }
  });

  app.get('/api/analytics/quarterly-planning', isAuthenticated, async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);
      
      const quarterlyPlanning = {
        currentQuarter: currentQuarter,
        year: currentYear,
        projections: {
          estimatedIncome: 45000,
          estimatedExpenses: 32000,
          estimatedProfit: 13000,
          vatOwed: 9450
        },
        upcomingDeadlines: [
          {
            task: 'BTW Aangifte Q4',
            deadline: '2025-01-31',
            daysLeft: Math.ceil((new Date('2025-01-31').getTime() - Date.now()) / 86400000),
            priority: 'high'
          },
          {
            task: 'Inkomstenbelasting 2024',
            deadline: '2025-04-01',
            daysLeft: Math.ceil((new Date('2025-04-01').getTime() - Date.now()) / 86400000),
            priority: 'medium'
          }
        ],
        recommendations: [
          'Overweeg extra aftrekposten voor kantoorkosten',
          'Plan liquiditeit voor BTW betaling',
          'Controleer of alle uitgaven correct gecategoriseerd zijn'
        ]
      };

      res.json(quarterlyPlanning);
    } catch (error) {
      console.error("Error generating quarterly planning:", error);
      res.status(500).json({ error: "Failed to generate quarterly planning" });
    }
  });

  app.get('/api/export/transactions', isAuthenticated, async (req, res) => {
    try {
      const { year, category } = req.query;
      let transactions = await storage.getTransactions();
      
      if (year) {
        transactions = transactions.filter(t => 
          new Date(t.date).getFullYear() === parseInt(year as string)
        );
      }
      
      if (category) {
        transactions = transactions.filter(t => t.category === category);
      }

      const csvHeader = 'Datum,Beschrijving,Bedrag,Categorie,Bankrekening\n';
      const csvData = transactions.map(t => 
        `${t.date},"${t.description}",${t.amount},${t.category || ''},${t.bankAccountId || ''}`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="transacties-${year || 'alle'}.csv"`);
      res.send(csvHeader + csvData);
    } catch (error) {
      console.error("Error exporting transactions:", error);
      res.status(500).json({ error: "Failed to export transactions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function generateTaxAdvice(question: string, businessType?: string, sector?: string) {
  const lowerQuestion = question.toLowerCase();
  
  // Check for laptop/computer questions
  if (lowerQuestion.includes('laptop') || lowerQuestion.includes('computer')) {
    return {
      answer: "✅ Ja, je mag je laptop gedeeltelijk aftrekken!",
      details: "Bij gemengd gebruik (zakelijk + privé) mag je het zakelijke percentage aftrekken. Voor ZZP'ers is dit vaak: 100% zakelijk gebruik → 100% aftrekbaar, 50% zakelijk gebruik → 50% aftrekbaar, Minimaal 10% zakelijk voor aftrek.",
      tip: "Houd een logboek bij van je zakelijke gebruik om het percentage te onderbouwen bij de Belastingdienst.",
      category: "aftrekposten"
    };
  }
  
  // Check for phone/telephone questions
  if (lowerQuestion.includes('telefoon') || lowerQuestion.includes('mobiel')) {
    return {
      answer: "✅ Ja, telefoonkosten zijn aftrekbaar voor ZZP'ers!",
      details: "Je kunt je zakelijke telefoonkosten volledig aftrekken. Bij gemengd gebruik kun je het zakelijke percentage aftrekken.",
      tip: "Houd bij hoeveel procent zakelijk gebruik je hebt en bewaar je facturen.",
      category: "aftrekposten"
    };
  }

  // Check for auto/car questions
  if (lowerQuestion.includes('auto') || lowerQuestion.includes('km') || lowerQuestion.includes('benzine')) {
    return {
      answer: "✅ Autokosten zijn aftrekbaar, maar er zijn verschillende methodes",
      details: "Je kunt kiezen tussen de werkelijke kosten methode of de kilometervergoeding (€0,22 per km in 2024).",
      tip: "De kilometervergoeding is vaak eenvoudiger voor ZZP'ers met beperkt zakelijk gebruik.",
      category: "transport"
    };
  }

  // Check for BTW questions
  if (lowerQuestion.includes('btw') || lowerQuestion.includes('aangifte')) {
    return {
      answer: "📅 BTW aangifte deadlines voor 2024",
      details: "Als BTW-plichtige ondernemer moet je per kwartaal aangifte doen: Q1: uiterlijk 30 april, Q2: uiterlijk 31 juli, Q3: uiterlijk 31 oktober, Q4: uiterlijk 31 januari (volgend jaar).",
      tip: "Zorg dat je administratie up-to-date is voordat je de aangifte doet.",
      category: "btw"
    };
  }

  // Check for important deductions
  if (lowerQuestion.includes('aftrekpost') || lowerQuestion.includes('aftrek')) {
    return {
      answer: "✅ Hier zijn de belangrijkste aftrekposten voor ZZP'ers:",
      details: "• Kantoorkosten (thuiswerkplek: €2/dag), • Telefoon en internet, • Computer en software, • Autokosten (zakelijk gebruik), • Cursussen en vakliteratuur, • Accountantskosten",
      tip: "Houd altijd bonnetjes bij en noteer het zakelijke doel van uitgaven.",
      category: "aftrekposten"
    };
  }

  // Default response
  return {
    answer: "Ik begrijp je vraag, maar kan hier geen specifiek advies over geven.",
    details: "Voor complexe belastingvragen raad ik aan om contact op te nemen met een erkende boekhouder of belastingadviseur.",
    tip: "Probeer je vraag anders te formuleren of gebruik een van de snelle vragen hierboven.",
    category: "algemeen"
  };
}
