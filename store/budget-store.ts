import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { storageAdapter } from '@/lib/storage'
import { BudgetState, Transaction } from '@/types'

// Initial draft state
const initialDraft = {
    amount: '',
    description: '',
    category: 'Food',
    type: 'expense' as const
}

export const useBudgetStore = create<BudgetState>()(
    persist(
        (set, get) => ({
            transactions: [],
            income: 0,
            syncStatus: 'local-only', // Default start state
            lastSynced: null,
            draftTransaction: initialDraft,

            // --- Actions ---

            // Keystroke Auto-Save: Updates the draft in store (and thus DB) immediately
            updateDraft: (updates) => set((state) => ({
                draftTransaction: { ...state.draftTransaction, ...updates }
            })),

            // Commit the drafted transaction
            addTransaction: () => {
                const { draftTransaction } = get()
                if (!draftTransaction.amount) return

                const newTransaction: Transaction = {
                    id: crypto.randomUUID(),
                    date: new Date().toISOString(),
                    amount: parseFloat(draftTransaction.amount),
                    description: draftTransaction.description || 'Untitled',
                    category: draftTransaction.category,
                    type: draftTransaction.type
                }

                set((state) => ({
                    transactions: [newTransaction, ...state.transactions],
                    draftTransaction: initialDraft, // Reset draft after add
                    syncStatus: 'pending-sync' // Mark as needing sync
                }))
            },

            removeTransaction: (id) => set((state) => ({
                transactions: state.transactions.filter(t => t.id !== id),
                syncStatus: 'pending-sync'
            })),

            setIncome: (amount) => set({ income: amount, syncStatus: 'pending-sync' }),

            setSyncStatus: (status) => set({ syncStatus: status }),

            markSynced: () => set({ syncStatus: 'synced', lastSynced: new Date().toISOString() })
        }),
        {
            name: 'budgetbox-db', // As requested
            storage: createJSONStorage(() => storageAdapter),
            // We persist everything, including the draft
            partialize: (state) => ({
                transactions: state.transactions,
                income: state.income,
                lastSynced: state.lastSynced,
                draftTransaction: state.draftTransaction,
                syncStatus: state.syncStatus === 'synced' ? 'synced' : 'pending-sync'
                // If we were syncing, revert to pending on reload just in case
            }),
        }
    )
)
