"use client"

import { useBudgetStore } from '@/store/budget-store'
import { ArrowUpIcon, ArrowDownIcon, WalletIcon } from 'lucide-react'

export function SummaryCards() {
    const transactions = useBudgetStore((state) => state.transactions)
    const incomeTarget = useBudgetStore((state) => state.income)

    const { totalIncome, totalExpense } = transactions.reduce(
        (acc, t) => {
            if (t.type === 'income') acc.totalIncome += t.amount
            else acc.totalExpense += t.amount
            return acc
        },
        { totalIncome: 0, totalExpense: 0 }
    )

    // If we treat "incomeTarget" as monthly salary, add it? 
    // Or just rely on transactions? The prompt says "Income - Spend".
    // Let's assume income transactions + fixed income setting.
    // For now, let's just use transactions for clear calculation or just the target.
    // If user sets "Income", we treat it as the base.

    const effectiveIncome = totalIncome + incomeTarget
    const balance = effectiveIncome - totalExpense
    const savingsRate = effectiveIncome > 0 ? (balance / effectiveIncome) * 100 : 0

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-panel p-6 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                    <ArrowUpIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Income</span>
                </div>
                <div className="text-2xl font-bold text-white">
                    ₹{effectiveIncome.toFixed(2)}
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-400">
                    <ArrowDownIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Expenses</span>
                </div>
                <div className="text-2xl font-bold text-white">
                    ₹{totalExpense.toFixed(2)}
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute right-0 top-0 p-4 opacity-10">
                    <WalletIcon className="w-24 h-24 text-white" />
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                    <WalletIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Savings</span>
                </div>
                <div className="text-2xl font-bold text-white">
                    ₹{balance.toFixed(2)}
                </div>
                <div className="text-xs text-zinc-400">
                    {savingsRate.toFixed(1)}% savings rate
                </div>
            </div>
        </div>
    )
}
