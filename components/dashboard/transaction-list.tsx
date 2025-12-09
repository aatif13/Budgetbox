"use client"

import { useBudgetStore } from '@/store/budget-store'
import { Trash2Icon } from 'lucide-react'

// Using Intl for date formatting to avoid extra dependency if possible
// But format is nice. I'll use Intl.
const formatDate = (dateString: string) => {
    try {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString))
    } catch (e) {
        return dateString
    }
}

export function TransactionList() {
    const transactions = useBudgetStore((state) => state.transactions)
    const removeTransaction = useBudgetStore((state) => state.removeTransaction)

    if (transactions.length === 0) {
        return (
            <div className="glass-panel p-6 rounded-xl text-center text-zinc-500 italic">
                No transactions recorded locally.
            </div>
        )
    }

    return (
        <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex flex-col">
                            <span className="text-white font-medium">{t.description}</span>
                            <span className="text-xs text-zinc-500">{t.category} • {formatDate(t.date)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`font-mono font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                            </span>
                            <button
                                onClick={() => removeTransaction(t.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-400 transition-all"
                            >
                                <Trash2Icon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
