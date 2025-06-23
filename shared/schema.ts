import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taxDeadlines = pgTable("tax_deadlines", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date").notNull(),
  category: text("category").notNull(), // 'btw', 'ib', 'jaarrekening'
  businessType: text("business_type").notNull(), // 'zzp', 'bv', 'both'
  isCompleted: boolean("is_completed").default(false).notNull(),
});

export const deductionRules = pgTable("deduction_rules", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  item: text("item").notNull(),
  description: text("description").notNull(),
  conditions: text("conditions").notNull(),
  percentage: integer("percentage"), // null means 100%
  businessType: text("business_type").notNull(), // 'zzp', 'bv', 'both'
  sector: text("sector"), // specific sector or null for all
});

export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  businessType: text("business_type").notNull(), // 'zzp', 'bv', 'both'
  tags: text("tags").array(),
});

export const todoLists = pgTable("todo_lists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  deadline: timestamp("deadline").notNull(),
  businessType: text("business_type").notNull(),
  sector: text("sector"),
  tasks: json("tasks").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  businessType: text("business_type").notNull(), // 'zzp', 'bv'
  sector: text("sector").notNull(),
  btwPlichtig: boolean("btw_plichtig").default(false).notNull(),
  preferences: json("preferences").$type<Record<string, any>>().default({}).notNull(),
});

// Insert schemas
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertTaxDeadlineSchema = createInsertSchema(taxDeadlines).omit({
  id: true,
});

export const insertDeductionRuleSchema = createInsertSchema(deductionRules).omit({
  id: true,
});

export const insertFaqItemSchema = createInsertSchema(faqItems).omit({
  id: true,
});

export const insertTodoListSchema = createInsertSchema(todoLists).omit({
  id: true,
  createdAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
});

// Types
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type TaxDeadline = typeof taxDeadlines.$inferSelect;
export type InsertTaxDeadline = z.infer<typeof insertTaxDeadlineSchema>;

export type DeductionRule = typeof deductionRules.$inferSelect;
export type InsertDeductionRule = z.infer<typeof insertDeductionRuleSchema>;

export type FaqItem = typeof faqItems.$inferSelect;
export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;

export type TodoList = typeof todoLists.$inferSelect;
export type InsertTodoList = z.infer<typeof insertTodoListSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
