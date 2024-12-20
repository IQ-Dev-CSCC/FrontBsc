import { Card } from "@/components/ui/card"
import { ExpensesList } from "@/components/expenses-list"
import { ExpensesChart } from "@/components/expenses-chart"
import { ExpensesSummary } from "@/components/expenses-summary"

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dépenses</h1>
          <p className="text-sm text-zinc-500">01 - 25 March 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <img src="/placeholder.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <img src="/placeholder.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <img src="/placeholder.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
            <span className="text-sm text-zinc-600">+2</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <Card className="p-6">
            <ExpensesChart />
          </Card>
          <Card className="p-6">
            <ExpensesList />
          </Card>
        </div>
        <Card className="p-6">
          <ExpensesSummary />
        </Card>
      </div>
    </div>
  )
}

