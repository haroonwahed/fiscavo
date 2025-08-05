import { Check, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const comparisonData = [
  {
    feature: "BTW-aangifte automatisering",
    fiscavo: true,
    accountant: false,
    competitor: true,
    traditional: false
  },
  {
    feature: "AI-powered uitgaven categorisering",
    fiscavo: true,
    accountant: false,
    competitor: false,
    traditional: false
  },
  {
    feature: "Real-time belastingadvies",
    fiscavo: true,
    accountant: true,
    competitor: false,
    traditional: false
  },
  {
    feature: "Kilometerregistratie",
    fiscavo: true,
    accountant: false,
    competitor: true,
    traditional: false
  },
  {
    feature: "Bank koppeling",
    fiscavo: true,
    accountant: false,
    competitor: true,
    traditional: false
  },
  {
    feature: "24/7 toegankelijk",
    fiscavo: true,
    accountant: false,
    competitor: true,
    traditional: false
  },
  {
    feature: "Nederlandse belastingregels",
    fiscavo: true,
    accountant: true,
    competitor: false,
    traditional: true
  },
  {
    feature: "Persoonlijke ondersteuning",
    fiscavo: true,
    accountant: true,
    competitor: false,
    traditional: false
  }
];

const pricing = {
  fiscavo: "€19/maand",
  accountant: "€150-300/maand",
  competitor: "€25-49/maand",
  traditional: "€50-150/jaar"
};

export function ComparisonTable() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Waarom Fiscavo de slimste keuze is
        </h3>
        <p className="text-gray-600">
          Vergelijk onze functies met traditionele oplossingen
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-4 font-medium text-gray-900">Functie</th>
              <th className="text-center p-4 font-medium text-gray-900 bg-blue-50 relative">
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Fiscavo
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Aanbevolen
                </div>
              </th>
              <th className="text-center p-4 font-medium text-gray-900">Boekhouder</th>
              <th className="text-center p-4 font-medium text-gray-900">Andere tools</th>
              <th className="text-center p-4 font-medium text-gray-900">Handmatig</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 text-gray-900 font-medium">{row.feature}</td>
                <td className="p-4 text-center bg-blue-50/50">
                  {row.fiscavo ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {row.accountant ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {row.competitor ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {row.traditional ? (
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="p-4 text-gray-900">Maandelijkse kosten</td>
              <td className="p-4 text-center text-blue-600 bg-blue-50">{pricing.fiscavo}</td>
              <td className="p-4 text-center text-gray-900">{pricing.accountant}</td>
              <td className="p-4 text-center text-gray-900">{pricing.competitor}</td>
              <td className="p-4 text-center text-gray-900">{pricing.traditional}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-blue-50 text-center">
        <p className="text-gray-700 mb-4">
          <strong>Bespaar tot €3.000 per jaar</strong> vergeleken met een traditionele boekhouder
        </p>
        <Link href="/signup">
          <Button className="btn-primary">
            Start gratis trial
          </Button>
        </Link>
      </div>
    </div>
  );
}