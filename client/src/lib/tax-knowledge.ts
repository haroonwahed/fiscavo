export interface TaxRule {
  id: string;
  category: string;
  item: string;
  description: string;
  conditions: string;
  percentage?: number;
  businessTypes: ('zzp' | 'bv')[];
  sectors?: string[];
}

export interface TaxAdviceResponse {
  answer: string;
  details: string;
  tip: string;
  category: string;
  confidence: number;
}

export const taxRules: TaxRule[] = [
  {
    id: 'laptop-computer',
    category: 'kantooruitrusting',
    item: 'Laptop/Computer',
    description: 'Laptop voor zakelijk gebruik',
    conditions: 'Gemengd gebruik toegestaan, percentage aftrekbaar op basis van zakelijk gebruik',
    businessTypes: ['zzp', 'bv'],
    sectors: ['IT', 'Consultancy', 'Marketing']
  },
  {
    id: 'phone-costs',
    category: 'communicatie',
    item: 'Telefoonkosten',
    description: 'Zakelijke telefoon- en internetkosten',
    conditions: 'Bij gemengd gebruik percentage aftrekbaar',
    businessTypes: ['zzp', 'bv']
  },
  {
    id: 'home-office',
    category: 'kantoorkosten',
    item: 'Thuiswerkplek',
    description: 'Kosten voor thuiswerkplek',
    conditions: 'ZZP: €2 per dag zonder bonnetjes, BV: werkelijke kosten met onderbouwing',
    businessTypes: ['zzp', 'bv']
  },
  {
    id: 'car-costs',
    category: 'transport',
    item: 'Autokosten',
    description: 'Zakelijke autokosten',
    conditions: 'Keuze tussen werkelijke kosten of kilometervergoeding (€0,22/km)',
    businessTypes: ['zzp', 'bv']
  }
];

export const generateTaxAdvice = (question: string, businessType?: string, sector?: string): TaxAdviceResponse => {
  const lowerQuestion = question.toLowerCase();
  
  // Laptop/computer advice
  if (lowerQuestion.includes('laptop') || lowerQuestion.includes('computer')) {
    return {
      answer: "✅ Ja, je mag je laptop gedeeltelijk aftrekken!",
      details: "Bij gemengd gebruik (zakelijk + privé) mag je het zakelijke percentage aftrekken. Voor ZZP'ers is dit vaak: 100% zakelijk gebruik → 100% aftrekbaar, 50% zakelijk gebruik → 50% aftrekbaar, Minimaal 10% zakelijk voor aftrek.",
      tip: "Houd een logboek bij van je zakelijke gebruik om het percentage te onderbouwen bij de Belastingdienst.",
      category: "aftrekposten",
      confidence: 0.95
    };
  }

  // Phone costs advice
  if (lowerQuestion.includes('telefoon') || lowerQuestion.includes('mobiel')) {
    return {
      answer: "✅ Ja, telefoonkosten zijn aftrekbaar voor ZZP'ers!",
      details: "Je kunt je zakelijke telefoonkosten volledig aftrekken. Bij gemengd gebruik kun je het zakelijke percentage aftrekken.",
      tip: "Houd bij hoeveel procent zakelijk gebruik je hebt en bewaar je facturen.",
      category: "aftrekposten",
      confidence: 0.9
    };
  }

  // Car costs advice
  if (lowerQuestion.includes('auto') || lowerQuestion.includes('km') || lowerQuestion.includes('benzine')) {
    return {
      answer: "✅ Autokosten zijn aftrekbaar, maar er zijn verschillende methodes",
      details: "Je kunt kiezen tussen de werkelijke kosten methode of de kilometervergoeding (€0,22 per km in 2024).",
      tip: "De kilometervergoeding is vaak eenvoudiger voor ZZP'ers met beperkt zakelijk gebruik.",
      category: "transport",
      confidence: 0.85
    };
  }

  // BTW advice
  if (lowerQuestion.includes('btw') || lowerQuestion.includes('aangifte')) {
    return {
      answer: "📅 BTW aangifte deadlines voor 2024",
      details: "Als BTW-plichtige ondernemer moet je per kwartaal aangifte doen: Q1: uiterlijk 30 april, Q2: uiterlijk 31 juli, Q3: uiterlijk 31 oktober, Q4: uiterlijk 31 januari (volgend jaar).",
      tip: "Zorg dat je administratie up-to-date is voordat je de aangifte doet.",
      category: "btw",
      confidence: 0.9
    };
  }

  // General deductions advice
  if (lowerQuestion.includes('aftrekpost') || lowerQuestion.includes('aftrek')) {
    return {
      answer: "✅ Hier zijn de belangrijkste aftrekposten voor ZZP'ers:",
      details: "• Kantoorkosten (thuiswerkplek: €2/dag), • Telefoon en internet, • Computer en software, • Autokosten (zakelijk gebruik), • Cursussen en vakliteratuur, • Accountantskosten",
      tip: "Houd altijd bonnetjes bij en noteer het zakelijke doel van uitgaven.",
      category: "aftrekposten",
      confidence: 0.8
    };
  }

  // Default response
  return {
    answer: "Ik begrijp je vraag, maar kan hier geen specifiek advies over geven.",
    details: "Voor complexe belastingvragen raad ik aan om contact op te nemen met een erkende boekhouder of belastingadviseur.",
    tip: "Probeer je vraag anders te formuleren of gebruik een van de snelle vragen hierboven.",
    category: "algemeen",
    confidence: 0.3
  };
};
