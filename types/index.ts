export type TransactionType = 'income' | 'expense'

export interface Transaction {
    id: string
    amount: number
    category: string
    description: string
    date: string // ISO string
    type: TransactionType
}

export interface DraftTransaction {
    amount: string // Keep as string for inputs
    description: string
    category: string
    type: TransactionType
}

export type SyncStatus = 'synced' | 'pending-sync' | 'local-only'

export interface BudgetState {
    transactions: Transaction[]
    draftTransaction: DraftTransaction // For auto-save
    income: number
    syncStatus: SyncStatus
    lastSynced: string | null

    // Actions
    addTransaction: () => void // Adds the CURRENT draft
    removeTransaction: (id: string) => void
    updateDraft: (updates: Partial<DraftTransaction>) => void // Keystroke auto-save
    setIncome: (amount: number) => void
    setSyncStatus: (status: SyncStatus) => void
    markSynced: () => void
}
