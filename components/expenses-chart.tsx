"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  amount: Math.floor(Math.random() * 1000000)
}))

export function ExpensesChart() {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Bar
            dataKey="amount"
            fill="#E2E8F0"
            radius={[4, 4, 0, 0]}
            className="[&_.recharts-bar-rectangle:hover]:fill-blue-500"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

