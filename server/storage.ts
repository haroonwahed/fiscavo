import { 
  ChatMessage, 
  InsertChatMessage,
  TaxDeadline,
  InsertTaxDeadline,
  DeductionRule,
  InsertDeductionRule,
  FaqItem,
  InsertFaqItem,
  TodoList,
  InsertTodoList,
  UserProfile,
  InsertUserProfile,
  BankAccount,
  InsertBankAccount,
  Transaction,
  InsertTransaction,
  BtwReturn,
  InsertBtwReturn,
  MileageEntry,
  InsertMileageEntry,
  TaxCalculation,
  InsertTaxCalculation,
  Receipt,
  InsertReceipt,
  chatMessages,
  taxDeadlines,
  deductionRules,
  faqItems,
  todoLists,
  userProfiles,
  bankAccounts,
  transactions,
  btwReturns,
  mileageEntries,
  taxCalculations,
  receipts
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Chat messages
  getChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Tax deadlines
  getTaxDeadlines(businessType?: string): Promise<TaxDeadline[]>;
  createTaxDeadline(deadline: InsertTaxDeadline): Promise<TaxDeadline>;
  updateTaxDeadline(id: number, deadline: Partial<TaxDeadline>): Promise<TaxDeadline>;

  // Deduction rules
  getDeductionRules(businessType?: string, sector?: string): Promise<DeductionRule[]>;
  createDeductionRule(rule: InsertDeductionRule): Promise<DeductionRule>;

  // FAQ items
  getFaqItems(businessType?: string, category?: string): Promise<FaqItem[]>;
  createFaqItem(item: InsertFaqItem): Promise<FaqItem>;

  // Todo lists
  getTodoLists(): Promise<TodoList[]>;
  createTodoList(todoList: InsertTodoList): Promise<TodoList>;

  // User profiles
  getUserProfile(id: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;

  // Bank accounts
  getBankAccounts(userId?: number): Promise<BankAccount[]>;
  createBankAccount(account: InsertBankAccount): Promise<BankAccount>;
  updateBankAccount(id: number, updates: Partial<BankAccount>): Promise<BankAccount>;

  // Transactions
  getTransactions(bankAccountId?: number, businessOnly?: boolean): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, updates: Partial<Transaction>): Promise<Transaction>;
  categorizeTransaction(id: number, category: string, isBusinessExpense: boolean): Promise<Transaction>;

  // BTW returns
  getBtwReturns(userId?: number, year?: number): Promise<BtwReturn[]>;
  createBtwReturn(btwReturn: InsertBtwReturn): Promise<BtwReturn>;
  updateBtwReturn(id: number, updates: Partial<BtwReturn>): Promise<BtwReturn>;

  // Mileage entries
  getMileageEntries(userId?: number, year?: number): Promise<MileageEntry[]>;
  createMileageEntry(entry: InsertMileageEntry): Promise<MileageEntry>;
  updateMileageEntry(id: number, updates: Partial<MileageEntry>): Promise<MileageEntry>;

  // Tax calculations
  getTaxCalculations(userId?: number, year?: number): Promise<TaxCalculation[]>;
  createTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation>;

  // Receipts
  getReceipts(transactionId?: number): Promise<Receipt[]>;
  createReceipt(receipt: InsertReceipt): Promise<Receipt>;
  updateReceipt(id: number, updates: Partial<Receipt>): Promise<Receipt>;
}

export class DatabaseStorage implements IStorage {
  async getChatMessages(): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [chatMessage] = await db
      .insert(chatMessages)
      .values(message)
      .returning();
    return chatMessage;
  }

  async getTaxDeadlines(businessType?: string): Promise<TaxDeadline[]> {
    const deadlines = await db.select().from(taxDeadlines);
    if (businessType) {
      return deadlines.filter(d => d.businessType === businessType || d.businessType === 'both');
    }
    return deadlines;
  }

  async createTaxDeadline(deadline: InsertTaxDeadline): Promise<TaxDeadline> {
    const [taxDeadline] = await db
      .insert(taxDeadlines)
      .values({
        ...deadline,
        isCompleted: deadline.isCompleted ?? false
      })
      .returning();
    return taxDeadline;
  }

  async updateTaxDeadline(id: number, updates: Partial<TaxDeadline>): Promise<TaxDeadline> {
    const [updated] = await db
      .update(taxDeadlines)
      .set(updates)
      .where(eq(taxDeadlines.id, id))
      .returning();
    
    if (!updated) throw new Error('Deadline not found');
    return updated;
  }

  async getDeductionRules(businessType?: string, sector?: string): Promise<DeductionRule[]> {
    const rules = await db.select().from(deductionRules);
    return rules.filter(rule => {
      const businessMatch = !businessType || rule.businessType === businessType || rule.businessType === 'both';
      const sectorMatch = !sector || !rule.sector || rule.sector === sector;
      return businessMatch && sectorMatch;
    });
  }

  async createDeductionRule(rule: InsertDeductionRule): Promise<DeductionRule> {
    const [deductionRule] = await db
      .insert(deductionRules)
      .values({
        ...rule,
        sector: rule.sector ?? null,
        percentage: rule.percentage ?? null
      })
      .returning();
    return deductionRule;
  }

  async getFaqItems(businessType?: string, category?: string): Promise<FaqItem[]> {
    const items = await db.select().from(faqItems);
    return items.filter(item => {
      const businessMatch = !businessType || item.businessType === businessType || item.businessType === 'both';
      const categoryMatch = !category || item.category === category;
      return businessMatch && categoryMatch;
    });
  }

  async createFaqItem(item: InsertFaqItem): Promise<FaqItem> {
    const [faqItem] = await db
      .insert(faqItems)
      .values({
        ...item,
        tags: item.tags ?? null
      })
      .returning();
    return faqItem;
  }

  async getTodoLists(): Promise<TodoList[]> {
    return await db.select().from(todoLists);
  }

  async createTodoList(todoList: InsertTodoList): Promise<TodoList> {
    const [list] = await db
      .insert(todoLists)
      .values(todoList)
      .returning();
    return list;
  }

  async getUserProfile(id: number): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.id, id));
    return profile || undefined;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [userProfile] = await db
      .insert(userProfiles)
      .values({
        ...profile,
        btwPlichtig: profile.btwPlichtig ?? false,
        preferences: profile.preferences ?? {}
      })
      .returning();
    return userProfile;
  }

  // Bank accounts
  async getBankAccounts(userId?: number): Promise<BankAccount[]> {
    if (userId) {
      return await db.select().from(bankAccounts).where(eq(bankAccounts.userId, userId));
    }
    return await db.select().from(bankAccounts);
  }

  async createBankAccount(account: InsertBankAccount): Promise<BankAccount> {
    const [bankAccount] = await db
      .insert(bankAccounts)
      .values(account)
      .returning();
    return bankAccount;
  }

  async updateBankAccount(id: number, updates: Partial<BankAccount>): Promise<BankAccount> {
    const [bankAccount] = await db
      .update(bankAccounts)
      .set(updates)
      .where(eq(bankAccounts.id, id))
      .returning();
    return bankAccount;
  }

  // Transactions
  async getTransactions(bankAccountId?: number, businessOnly?: boolean): Promise<Transaction[]> {
    let query = db.select().from(transactions);
    
    if (bankAccountId) {
      query = query.where(eq(transactions.bankAccountId, bankAccountId));
    }
    if (businessOnly) {
      query = query.where(eq(transactions.isBusinessExpense, true));
    }
    
    return await query;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async updateTransaction(id: number, updates: Partial<Transaction>): Promise<Transaction> {
    const [transaction] = await db
      .update(transactions)
      .set(updates)
      .where(eq(transactions.id, id))
      .returning();
    return transaction;
  }

  async categorizeTransaction(id: number, category: string, isBusinessExpense: boolean): Promise<Transaction> {
    const [transaction] = await db
      .update(transactions)
      .set({ category, isBusinessExpense })
      .where(eq(transactions.id, id))
      .returning();
    return transaction;
  }

  // BTW returns
  async getBtwReturns(userId?: number, year?: number): Promise<BtwReturn[]> {
    let query = db.select().from(btwReturns);
    
    if (userId) {
      query = query.where(eq(btwReturns.userId, userId));
    }
    if (year) {
      query = query.where(eq(btwReturns.year, year));
    }
    
    return await query;
  }

  async createBtwReturn(btwReturn: InsertBtwReturn): Promise<BtwReturn> {
    const [newBtwReturn] = await db
      .insert(btwReturns)
      .values(btwReturn)
      .returning();
    return newBtwReturn;
  }

  async updateBtwReturn(id: number, updates: Partial<BtwReturn>): Promise<BtwReturn> {
    const [btwReturn] = await db
      .update(btwReturns)
      .set(updates)
      .where(eq(btwReturns.id, id))
      .returning();
    return btwReturn;
  }

  // Mileage entries
  async getMileageEntries(userId?: number, year?: number): Promise<MileageEntry[]> {
    let query = db.select().from(mileageEntries);
    
    if (userId) {
      query = query.where(eq(mileageEntries.userId, userId));
    }
    
    return await query;
  }

  async createMileageEntry(entry: InsertMileageEntry): Promise<MileageEntry> {
    const [mileageEntry] = await db
      .insert(mileageEntries)
      .values(entry)
      .returning();
    return mileageEntry;
  }

  async updateMileageEntry(id: number, updates: Partial<MileageEntry>): Promise<MileageEntry> {
    const [mileageEntry] = await db
      .update(mileageEntries)
      .set(updates)
      .where(eq(mileageEntries.id, id))
      .returning();
    return mileageEntry;
  }

  // Tax calculations
  async getTaxCalculations(userId?: number, year?: number): Promise<TaxCalculation[]> {
    let query = db.select().from(taxCalculations);
    
    if (userId) {
      query = query.where(eq(taxCalculations.userId, userId));
    }
    if (year) {
      query = query.where(eq(taxCalculations.year, year));
    }
    
    return await query;
  }

  async createTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation> {
    const [taxCalculation] = await db
      .insert(taxCalculations)
      .values(calculation)
      .returning();
    return taxCalculation;
  }

  // Receipts
  async getReceipts(transactionId?: number): Promise<Receipt[]> {
    if (transactionId) {
      return await db.select().from(receipts).where(eq(receipts.transactionId, transactionId));
    }
    return await db.select().from(receipts);
  }

  async createReceipt(receipt: InsertReceipt): Promise<Receipt> {
    const [newReceipt] = await db
      .insert(receipts)
      .values(receipt)
      .returning();
    return newReceipt;
  }

  async updateReceipt(id: number, updates: Partial<Receipt>): Promise<Receipt> {
    const [receipt] = await db
      .update(receipts)
      .set(updates)
      .where(eq(receipts.id, id))
      .returning();
    return receipt;
  }
}

export class MemStorage implements IStorage {
  private chatMessages: Map<number, ChatMessage> = new Map();
  private taxDeadlines: Map<number, TaxDeadline> = new Map();
  private deductionRules: Map<number, DeductionRule> = new Map();
  private faqItems: Map<number, FaqItem> = new Map();
  private todoLists: Map<number, TodoList> = new Map();
  private userProfiles: Map<number, UserProfile> = new Map();
  private currentId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed tax deadlines
    const deadlines: InsertTaxDeadline[] = [
      {
        title: "BTW Q3 2024",
        description: "BTW aangifte derde kwartaal 2024",
        dueDate: new Date("2024-10-31"),
        category: "btw",
        businessType: "both",
        isCompleted: false,
      },
      {
        title: "IB Q4 2024",
        description: "Inkomstenbelasting vierde kwartaal 2024",
        dueDate: new Date("2024-12-31"),
        category: "ib",
        businessType: "zzp",
        isCompleted: false,
      },
      {
        title: "Jaarrekening 2023",
        description: "Jaarrekening indienen voor 2023",
        dueDate: new Date("2024-09-30"),
        category: "jaarrekening",
        businessType: "bv",
        isCompleted: false,
      },
    ];

    deadlines.forEach(deadline => this.createTaxDeadline(deadline));

    // Seed deduction rules
    const rules: InsertDeductionRule[] = [
      {
        category: "kantoorkosten",
        item: "Thuiswerkplek",
        description: "Kosten voor thuiswerkplek",
        conditions: "Minimaal 10% zakelijk gebruik",
        percentage: null,
        businessType: "both",
        sector: null,
      },
      {
        category: "transport",
        item: "Laptop",
        description: "Laptop voor zakelijk gebruik",
        conditions: "Gemengd gebruik toegestaan, percentage aftrekbaar",
        percentage: null,
        businessType: "both",
        sector: "IT",
      },
      {
        category: "communicatie",
        item: "Telefoonkosten",
        description: "Zakelijke telefoonkosten",
        conditions: "Bij gemengd gebruik percentage aftrekbaar",
        percentage: null,
        businessType: "both",
        sector: null,
      },
    ];

    rules.forEach(rule => this.createDeductionRule(rule));

    // Seed FAQ items
    const faqs: InsertFaqItem[] = [
      {
        question: "Wanneer moet ik BTW aangifte doen als ZZP'er?",
        answer: "Als ZZP'er moet je BTW aangifte doen indien je BTW-plichtig bent (omzet >€20.000). De aangiften zijn per kwartaal: Q1: Uiterlijk 30 april, Q2: Uiterlijk 31 juli, Q3: Uiterlijk 31 oktober, Q4: Uiterlijk 31 januari (volgend jaar).",
        category: "btw",
        businessType: "zzp",
        tags: ["btw", "deadlines", "kwartaal"],
      },
      {
        question: "Welke kosten kan ik aftrekken als webdeveloper?",
        answer: "Als webdeveloper kun je o.a. aftrekken: laptop en software, internetkosten, telefoonkosten, thuiswerkplek (€2/dag), cursussen en boeken, hosting en domeinkosten, kantoorbenodigdheden.",
        category: "aftrekposten",
        businessType: "both",
        tags: ["aftrekposten", "IT", "webdevelopment"],
      },
      {
        question: "Wat is het verschil tussen ZZP en BV voor belastingen?",
        answer: "ZZP'ers betalen inkomstenbelasting over winst, BV's betalen vennootschapsbelasting (25.8%). BV biedt meer fiscale mogelijkheden maar ook meer administratieve lasten en kosten.",
        category: "algemeen",
        businessType: "both",
        tags: ["zzp", "bv", "verschillen"],
      },
    ];

    faqs.forEach(faq => this.createFaqItem(faq));
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values());
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId++;
    const chatMessage: ChatMessage = {
      ...message,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getTaxDeadlines(businessType?: string): Promise<TaxDeadline[]> {
    const deadlines = Array.from(this.taxDeadlines.values());
    if (businessType) {
      return deadlines.filter(d => d.businessType === businessType || d.businessType === 'both');
    }
    return deadlines;
  }

  async createTaxDeadline(deadline: InsertTaxDeadline): Promise<TaxDeadline> {
    const id = this.currentId++;
    const taxDeadline: TaxDeadline = { 
      ...deadline, 
      id,
      isCompleted: deadline.isCompleted ?? false
    };
    this.taxDeadlines.set(id, taxDeadline);
    return taxDeadline;
  }

  async updateTaxDeadline(id: number, updates: Partial<TaxDeadline>): Promise<TaxDeadline> {
    const deadline = this.taxDeadlines.get(id);
    if (!deadline) throw new Error('Deadline not found');
    
    const updated = { ...deadline, ...updates };
    this.taxDeadlines.set(id, updated);
    return updated;
  }

  async getDeductionRules(businessType?: string, sector?: string): Promise<DeductionRule[]> {
    const rules = Array.from(this.deductionRules.values());
    return rules.filter(rule => {
      const businessMatch = !businessType || rule.businessType === businessType || rule.businessType === 'both';
      const sectorMatch = !sector || !rule.sector || rule.sector === sector;
      return businessMatch && sectorMatch;
    });
  }

  async createDeductionRule(rule: InsertDeductionRule): Promise<DeductionRule> {
    const id = this.currentId++;
    const deductionRule: DeductionRule = { 
      ...rule, 
      id,
      sector: rule.sector ?? null,
      percentage: rule.percentage ?? null
    };
    this.deductionRules.set(id, deductionRule);
    return deductionRule;
  }

  async getFaqItems(businessType?: string, category?: string): Promise<FaqItem[]> {
    const items = Array.from(this.faqItems.values());
    return items.filter(item => {
      const businessMatch = !businessType || item.businessType === businessType || item.businessType === 'both';
      const categoryMatch = !category || item.category === category;
      return businessMatch && categoryMatch;
    });
  }

  async createFaqItem(item: InsertFaqItem): Promise<FaqItem> {
    const id = this.currentId++;
    const faqItem: FaqItem = { 
      ...item, 
      id,
      tags: item.tags ?? null
    };
    this.faqItems.set(id, faqItem);
    return faqItem;
  }

  async getTodoLists(): Promise<TodoList[]> {
    return Array.from(this.todoLists.values());
  }

  async createTodoList(todoList: InsertTodoList): Promise<TodoList> {
    const id = this.currentId++;
    const list: TodoList = {
      ...todoList,
      id,
      createdAt: new Date(),
      sector: todoList.sector ?? null,
    };
    this.todoLists.set(id, list);
    return list;
  }

  async getUserProfile(id: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const userProfile: UserProfile = { 
      ...profile, 
      id,
      btwPlichtig: profile.btwPlichtig ?? false,
      preferences: profile.preferences ?? {}
    };
    this.userProfiles.set(id, userProfile);
    return userProfile;
  }
}

// Initialize database storage and seed data
const dbStorage = new DatabaseStorage();

// Seed data function
async function seedDatabase() {
  try {
    // Check if data already exists
    const existingDeadlines = await dbStorage.getTaxDeadlines();
    if (existingDeadlines.length > 0) {
      return; // Data already seeded
    }

    // Seed tax deadlines
    const deadlines = [
      {
        title: "BTW Q3 2024",
        description: "BTW aangifte derde kwartaal 2024",
        dueDate: new Date("2024-10-31"),
        category: "btw",
        businessType: "both",
        isCompleted: false,
      },
      {
        title: "IB Q4 2024", 
        description: "Inkomstenbelasting vierde kwartaal 2024",
        dueDate: new Date("2024-12-31"),
        category: "ib",
        businessType: "zzp",
        isCompleted: false,
      },
      {
        title: "Jaarrekening 2023",
        description: "Jaarrekening indienen voor 2023",
        dueDate: new Date("2024-09-30"),
        category: "jaarrekening",
        businessType: "bv",
        isCompleted: false,
      },
    ];

    for (const deadline of deadlines) {
      await dbStorage.createTaxDeadline(deadline);
    }

    // Seed deduction rules
    const rules = [
      {
        category: "kantoorkosten",
        item: "Thuiswerkplek",
        description: "Kosten voor thuiswerkplek",
        conditions: "Minimaal 10% zakelijk gebruik",
        percentage: null,
        businessType: "both",
        sector: null,
      },
      {
        category: "transport",
        item: "Laptop",
        description: "Laptop voor zakelijk gebruik", 
        conditions: "Gemengd gebruik toegestaan, percentage aftrekbaar",
        percentage: null,
        businessType: "both",
        sector: "IT",
      },
      {
        category: "communicatie",
        item: "Telefoonkosten",
        description: "Zakelijke telefoonkosten",
        conditions: "Bij gemengd gebruik percentage aftrekbaar",
        percentage: null,
        businessType: "both",
        sector: null,
      },
    ];

    for (const rule of rules) {
      await dbStorage.createDeductionRule(rule);
    }

    // Seed FAQ items
    const faqs = [
      {
        question: "Wanneer moet ik BTW aangifte doen als ZZP'er?",
        answer: "Als ZZP'er moet je BTW aangifte doen indien je BTW-plichtig bent (omzet >€20.000). De aangiften zijn per kwartaal: Q1: Uiterlijk 30 april, Q2: Uiterlijk 31 juli, Q3: Uiterlijk 31 oktober, Q4: Uiterlijk 31 januari (volgend jaar).",
        category: "btw",
        businessType: "zzp",
        tags: ["btw", "deadlines", "kwartaal"],
      },
      {
        question: "Welke kosten kan ik aftrekken als webdeveloper?",
        answer: "Als webdeveloper kun je o.a. aftrekken: laptop en software, internetkosten, telefoonkosten, thuiswerkplek (€2/dag), cursussen en boeken, hosting en domeinkosten, kantoorbenodigdheden.",
        category: "aftrekposten",
        businessType: "both",
        tags: ["aftrekposten", "IT", "webdevelopment"],
      },
      {
        question: "Wat is het verschil tussen ZZP en BV voor belastingen?",
        answer: "ZZP'ers betalen inkomstenbelasting over winst, BV's betalen vennootschapsbelasting (25.8%). BV biedt meer fiscale mogelijkheden maar ook meer administratieve lasten en kosten.",
        category: "algemeen",
        businessType: "both",
        tags: ["zzp", "bv", "verschillen"],
      },
    ];

    for (const faq of faqs) {
      await dbStorage.createFaqItem(faq);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Seed database on startup
seedDatabase();

export const storage = dbStorage;
