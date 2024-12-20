export function ExpensesSummary() {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Where your money go?</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Food and Drinks</span>
            <span className="font-medium">872,400</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Shopping</span>
            <span className="font-medium">1,378,200</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-blue-500 rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Housing</span>
            <span className="font-medium">928,500</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-purple-500 rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Transportation</span>
            <span className="font-medium">420,700</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-[35%] bg-orange-500 rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Vehicle</span>
            <span className="font-medium">520,000</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-[25%] bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-50 rounded-xl space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <img src="/placeholder.svg" alt="Tips" className="w-12 h-12" />
          </div>
          <div>
            <h4 className="font-medium">Save more money</h4>
            <p className="text-sm text-zinc-500 mt-1">
              accumsan tempor occaecati ut velit et primis magna diam
            </p>
          </div>
        </div>
        <button className="w-full bg-zinc-900 text-white rounded-lg py-2 text-sm font-medium">
          View Tips
        </button>
      </div>
    </div>
  )
}

