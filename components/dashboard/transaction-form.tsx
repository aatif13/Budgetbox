"use client"

import { useBudgetStore } from '@/store/budget-store'
import { PlusIcon } from 'lucide-react'

export function AddTransactionForm() {
    const addTransaction = useBudgetStore((state) => state.addTransaction)
    const updateDraft = useBudgetStore((state) => state.updateDraft)
    const draft = useBudgetStore((state) => state.draftTransaction)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addTransaction()
    }

    return (
        <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-medium text-white">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => updateDraft({ type: 'expense' })}
                        className={`flex-1 py-2 rounded-lg text-sm transition-colors ${draft.type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => updateDraft({ type: 'income' })}
                        className={`flex-1 py-2 rounded-lg text-sm transition-colors ${draft.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                    >
                        Income
                    </button>
                </div>

                <div className="space-y-2">
                    <input
                        type="number"
                        placeholder="0.00"
                        value={draft.amount}
                        // Keystroke Auto-Save:
                        onChange={(e) => updateDraft({ amount: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-2xl font-bold text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Description"
                        value={draft.description}
                        // Keystroke Auto-Save:
                        onChange={(e) => updateDraft({ description: e.target.value })}
                        className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                    {draft.type === 'expense' && (
                        <select
                            value={draft.category}
                            // Keystroke Auto-Save:
                            onChange={(e) => updateDraft({ category: e.target.value })}
                            className="bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Fun</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                        </select>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add {draft.type}
                </button>
            </form>
        </div>
    )
}
