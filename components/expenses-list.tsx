"use client"

import { cn } from "@/lib/utils"
import { ShoppingCart, Car, Home, Coffee, Music } from 'lucide-react'

const expenses = [
  {
    category: "Grocery",
    time: "8:32 pm",
    description: "Balanjo di Jamur",
    amount: "-26,800",
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    category: "Transportation",
    time: "8:32 pm",
    description: "Naik bus umum",
    amount: "-15,000",
    icon: Car,
    color: "bg-purple-100 text-purple-600",
  },
  {
    category: "Housing",
    time: "8:32 pm",
    description: "Bayar ListRik",
    amount: "-185,750",
    icon: Home,
    color: "bg-orange-100 text-orange-600",
  },
  {
    category: "Food and Drink",
    time: "8:32 pm",
    description: "Makan Siang",
    amount: "-156,000",
    icon: Coffee,
    color: "bg-red-100 text-red-600",
  },
  {
    category: "Entertainment",
    time: "8:32 pm",
    description: "Nonton Bioskop",
    amount: "-35,200",
    icon: Music,
    color: "bg-green-100 text-green-600",
  },
]

export function ExpensesList() {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Today</h3>
      <div className="space-y-4">
        {expenses.map((expense, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={cn("p-2 rounded-xl", expense.color)}>
                <expense.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium group-hover:text-blue-600 transition-colors">
                  {expense.category}
                </p>
                <p className="text-sm text-zinc-500">
                  {expense.time} • {expense.description}
                </p>
              </div>
            </div>
            <p className="font-medium">{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

