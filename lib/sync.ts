import { BudgetState } from "@/types"

export async function syncBudget(data: BudgetState): Promise<'synced' | 'failed'> {
    // Simulate network check (in a real app, this would happen naturally by the fetch failing)
    if (!navigator.onLine) return 'failed'

    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In real app: POST /budget/sync
        // const res = await fetch("/budget/sync", { ... })
        // if (!res.ok) throw new Error('Sync failed')

        console.log("Mock Sync Successful", data)
        return 'synced'
    } catch (error) {
        console.error("Sync failed", error)
        return 'failed'
    }
}
