"use client"

import MountainScene from "@/components/ui/mountain-scene"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { ExpensePieChart } from "@/components/dashboard/expense-chart"
import { AddTransactionForm } from "@/components/dashboard/transaction-form"
import { TransactionList } from "@/components/dashboard/transaction-list"
import { useBudgetStore } from "@/store/budget-store"
import { SyncManager } from "@/components/sync-manager"
import AuthGuard from "@/components/auth-guard"
import { useEffect, useState } from "react"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const syncStatus = useBudgetStore((state) => state.syncStatus)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("auth")
        router.push("/login")
    }

    if (!mounted) return null

    return (
        <AuthGuard>
            <main className="relative min-h-screen bg-black overflow-hidden font-sans selection:bg-cyan-500/30">
                <SyncManager />

                {/* Background Layer */}
                <div className="fixed inset-0 z-0">
                    <MountainScene className="w-full h-full opacity-60" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">

                    {/* Header */}
                    <header className="flex items-center justify-between glass-panel p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="font-bold text-white text-xl">B</span>
                            </div>
                            <h1 className="text-xl font-bold text-white tracking-tight">BudgetBox</h1>
                        </div>

                        {/* Offline Indicator UI and Logout */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
                                {syncStatus === 'synced' && <span className="text-emerald-400 font-medium flex items-center gap-2">● Synced</span>}
                                {syncStatus === 'pending-sync' && <span className="text-amber-400 font-medium flex items-center gap-2">● Pending</span>}
                                {syncStatus === 'local-only' && <span className="text-rose-400 font-medium flex items-center gap-2">● Local Only</span>}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <LogOutIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </header>

                    {/* Dashboard Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <SummaryCards />

                            <div className="glass-panel p-6 rounded-xl">
                                <h3 className="text-lg font-medium text-white mb-6">Expense Breakdown</h3>
                                <ExpensePieChart />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <AddTransactionForm />
                            <TransactionList />
                        </div>
                    </div>

                </div>
            </main>
        </AuthGuard>
    )
}
