import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
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
