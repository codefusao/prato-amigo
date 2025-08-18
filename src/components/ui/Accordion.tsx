
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
            aria-expanded={openItems.includes(item.id)}
          >
            <span className="font-semibold text-gray-900">{item.title}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-green-600 transition-transform duration-200',
                openItems.includes(item.id) && 'rotate-180'
              )}
            />
          </button>
          {openItems.includes(item.id) && (
            <div className="px-6 py-4 bg-white border-t border-gray-200 animate-slide-down">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}