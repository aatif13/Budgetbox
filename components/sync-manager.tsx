"use client"

import { useEffect } from "react"
import { useBudgetStore } from "@/store/budget-store"
import { syncBudget } from "@/lib/sync"

export function SyncManager() {
    const syncStatus = useBudgetStore((state) => state.syncStatus)
    const setSyncStatus = useBudgetStore((state) => state.setSyncStatus)
    const markSynced = useBudgetStore((state) => state.markSynced)

    // Auto-sync function
    const attemptSync = async () => {
        const currentState = useBudgetStore.getState()
        if (currentState.syncStatus === 'synced') return

        const result = await syncBudget(currentState)
        if (result === 'synced') {
            markSynced()
        }
    }

    useEffect(() => {
        const handleOnline = () => {
            console.log("Network Online - Attempting Auto-Sync")
            attemptSync()
        }

        const handleOffline = () => {
            // Optional: Update status to show we are definitely offline?
            // But our logic uses 'pending-sync' to mean "we have data to sync".
            // We can leave it as is or force a check.
            console.log("Network Offline")
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Immediate check on mount if pending
        if (syncStatus === 'pending-sync' && navigator.onLine) {
            attemptSync()
        }

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [syncStatus])

    return null // Headless component
}
