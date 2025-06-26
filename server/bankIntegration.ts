// Bank integration service for Dutch banks
// This provides a framework for connecting with Dutch banking APIs

export interface BankAccount {
  id: string;
  iban: string;
  bankName: string;
  accountType: 'business' | 'personal';
  balance: number;
  currency: string;
}

export interface BankTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  counterParty: string;
  counterPartyIban?: string;
  transactionType: 'debit' | 'credit';
  category?: string;
}

export class DutchBankService {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  // Framework for connecting to major Dutch banks
  async connectBank(bankCode: string, credentials: any): Promise<{ success: boolean; accountId?: string; error?: string }> {
    if (!this.apiKey) {
      return { 
        success: false, 
        error: "Bank integratie vereist API configuratie. Neem contact op met support." 
      };
    }

    try {
      // This would integrate with services like:
      // - Plaid (for international support)
      // - Salt Edge (European focus)
      // - TrueLayer (Open Banking)
      // - Direct bank APIs (ING, ABN AMRO, Rabobank)
      
      switch (bankCode) {
        case 'ING':
          return await this.connectING(credentials);
        case 'ABNAMRO':
          return await this.connectABNAMRO(credentials);
        case 'RABOBANK':
          return await this.connectRabobank(credentials);
        default:
          return { success: false, error: `Bank ${bankCode} nog niet ondersteund` };
      }
    } catch (error) {
      console.error('Bank connection error:', error);
      return { success: false, error: "Verbinding met bank mislukt" };
    }
  }

  private async connectING(credentials: any): Promise<{ success: boolean; accountId?: string; error?: string }> {
    // ING Developer Portal integration
    // Would use OAuth2 flow with ING's API
    return { 
      success: false, 
      error: "ING integratie wordt binnenkort toegevoegd. Gebruik handmatige invoer." 
    };
  }

  private async connectABNAMRO(credentials: any): Promise<{ success: boolean; accountId?: string; error?: string }> {
    // ABN AMRO Developer Portal integration
    return { 
      success: false, 
      error: "ABN AMRO integratie wordt binnenkort toegevoegd. Gebruik handmatige invoer." 
    };
  }

  private async connectRabobank(credentials: any): Promise<{ success: boolean; accountId?: string; error?: string }> {
    // Rabobank Developer Platform integration
    return { 
      success: false, 
      error: "Rabobank integratie wordt binnenkort toegevoegd. Gebruik handmatige invoer." 
    };
  }

  async getAccounts(): Promise<BankAccount[]> {
    if (!this.apiKey) {
      return [];
    }

    // Mock data for demonstration
    return [
      {
        id: 'account_1',
        iban: 'NL91 ABNA 0417 1643 00',
        bankName: 'ABN AMRO',
        accountType: 'business',
        balance: 15420.50,
        currency: 'EUR'
      }
    ];
  }

  async getTransactions(accountId: string, fromDate?: string, toDate?: string): Promise<BankTransaction[]> {
    if (!this.apiKey) {
      return [];
    }

    // Mock data for demonstration
    return [
      {
        id: 'tx_1',
        amount: -125.50,
        description: 'Kantoorbenodigdheden - OfficeMax',
        date: '2024-12-20',
        counterParty: 'OfficeMax Nederland',
        transactionType: 'debit',
        category: 'Kantoorbenodigdheden'
      },
      {
        id: 'tx_2',
        amount: 1500.00,
        description: 'Factuur #2024-001 - Client ABC',
        date: '2024-12-19',
        counterParty: 'Client ABC BV',
        transactionType: 'credit',
        category: 'Inkomsten'
      }
    ];
  }

  async syncTransactions(accountId: string): Promise<{ newTransactions: number; errors: string[] }> {
    if (!this.apiKey) {
      return { 
        newTransactions: 0, 
        errors: ['Bank API niet geconfigureerd'] 
      };
    }

    try {
      // Would fetch new transactions and categorize them
      const transactions = await this.getTransactions(accountId);
      
      return {
        newTransactions: transactions.length,
        errors: []
      };
    } catch (error) {
      return {
        newTransactions: 0,
        errors: ['Synchronisatie mislukt']
      };
    }
  }
}

// Export singleton instance
export const bankService = new DutchBankService(process.env.BANK_API_KEY);

// Helper to detect Dutch bank from IBAN
export function detectBankFromIban(iban: string): string {
  const bankCodes: { [key: string]: string } = {
    'ABNA': 'ABN AMRO',
    'INGB': 'ING Bank',
    'RABO': 'Rabobank',
    'SNSB': 'SNS Bank',
    'TRIO': 'Triodos Bank',
    'ASNB': 'ASN Bank',
    'KNAB': 'Knab',
    'BUNQ': 'bunq'
  };

  const bankCode = iban.substring(4, 8);
  return bankCodes[bankCode] || 'Onbekende bank';
}

// Validate Dutch IBAN
export function validateDutchIban(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check if it starts with NL and has correct length
  if (!cleanIban.startsWith('NL') || cleanIban.length !== 18) {
    return false;
  }
  
  // Basic IBAN checksum validation
  const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, (char) => 
    (char.charCodeAt(0) - 55).toString()
  );
  
  // Calculate mod 97
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  
  return remainder === 1;
}