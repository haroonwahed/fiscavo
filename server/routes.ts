import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertTodoListSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
