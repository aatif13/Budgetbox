"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useBudgetStore } from '@/store/budget-store'
import { useMemo } from 'react'

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

export function ExpensePieChart() {
    const transactions = useBudgetStore((state) => state.transactions)

    const data = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense')
        const categoryTotals: Record<string, number> = {}

        expenses.forEach(t => {
            const cat = t.category || 'Uncategorized'
            categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount
        })

        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
    }, [transactions])

    if (data.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center text-zinc-500">
                No expenses yet
            </div>
        )
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', background: 'rgba(0,0,0,0.8)', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
