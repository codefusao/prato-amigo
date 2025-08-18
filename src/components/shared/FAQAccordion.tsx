import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  title: string;
  content: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  return (
    <div className={`max-w-3xl mx-auto space-y-3 ${className}`}>
      {items.map(item => (
        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${activeAccordion === item.id ? 'rotate-180' : ''}`} />
          </button>
          {activeAccordion === item.id && (
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-gray-700">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
