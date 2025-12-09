import { StateStorage } from 'zustand/middleware'
import localforage from 'localforage'

// Configure LocalForage
localforage.config({
    name: 'budgetbox-db',
    storeName: 'budget_store',
    description: 'Offline-first budget data'
})

export const storageAdapter: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await localforage.getItem(name)) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await localforage.setItem(name, value)
    },
    removeItem: async (name: string): Promise<void> => {
        await localforage.removeItem(name)
    },
}
