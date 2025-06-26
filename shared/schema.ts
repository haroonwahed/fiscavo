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

// Bank accounts for transaction import
export const bankAccounts = pgTable("bank_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userProfiles.id),
  bankName: text("bank_name").notNull(),
  accountNumber: text("account_number").notNull(),
  accountType: text("account_type").notNull(), // business, private
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Financial transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bankAccountId: integer("bank_account_id").references(() => bankAccounts.id),
  amount: text("amount").notNull(), // Store as text to avoid precision issues
  description: text("description").notNull(),
  date: text("date").notNull(), // Store as ISO date string
  category: text("category"),
  isBusinessExpense: boolean("is_business_expense").default(false),
  btwRate: text("btw_rate"), // 21%, 9%, 0%
  btwAmount: text("btw_amount"),
  receiptUrl: text("receipt_url"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BTW returns
export const btwReturns = pgTable("btw_returns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userProfiles.id),
  quarter: integer("quarter").notNull(), // 1, 2, 3, 4
  year: integer("year").notNull(),
  totalSales: text("total_sales").notNull(),
  totalPurchases: text("total_purchases").notNull(),
  btwOwed: text("btw_owed").notNull(),
  btwPaid: text("btw_paid").notNull(),
  netBtwDue: text("net_btw_due").notNull(),
  status: text("status").default("draft").notNull(), // draft, submitted, paid
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Mileage tracking
export const mileageEntries = pgTable("mileage_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userProfiles.id),
  date: text("date").notNull(),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location").notNull(),
  distance: text("distance").notNull(), // in kilometers
  purpose: text("purpose").notNull(),
  rate: text("rate").default("0.23").notNull(), // €0.23 per km
  totalAmount: text("total_amount").notNull(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tax calculations
export const taxCalculations = pgTable("tax_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userProfiles.id),
  year: integer("year").notNull(),
  totalIncome: text("total_income").notNull(),
  totalExpenses: text("total_expenses").notNull(),
  taxableIncome: text("taxable_income").notNull(),
  incomeTax: text("income_tax").notNull(),
  socialContributions: text("social_contributions"),
  totalTaxDue: text("total_tax_due").notNull(),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
});

// Receipt uploads
export const receipts = pgTable("receipts", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  extractedText: text("extracted_text"),
  extractedAmount: text("extracted_amount"),
  extractedDate: text("extracted_date"),
  extractedVendor: text("extracted_vendor"),
  isProcessed: boolean("is_processed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const insertBankAccountSchema = createInsertSchema(bankAccounts).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertBtwReturnSchema = createInsertSchema(btwReturns).omit({
  id: true,
  createdAt: true,
});

export const insertMileageEntrySchema = createInsertSchema(mileageEntries).omit({
  id: true,
  createdAt: true,
});

export const insertTaxCalculationSchema = createInsertSchema(taxCalculations).omit({
  id: true,
  calculatedAt: true,
});

export const insertReceiptSchema = createInsertSchema(receipts).omit({
  id: true,
  createdAt: true,
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

export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = z.infer<typeof insertBankAccountSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type BtwReturn = typeof btwReturns.$inferSelect;
export type InsertBtwReturn = z.infer<typeof insertBtwReturnSchema>;

export type MileageEntry = typeof mileageEntries.$inferSelect;
export type InsertMileageEntry = z.infer<typeof insertMileageEntrySchema>;

export type TaxCalculation = typeof taxCalculations.$inferSelect;
export type InsertTaxCalculation = z.infer<typeof insertTaxCalculationSchema>;

export type Receipt = typeof receipts.$inferSelect;
export type InsertReceipt = z.infer<typeof insertReceiptSchema>;
