"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MountainScene from "@/components/ui/mountain-scene"
import { LockIcon, MailIcon, ArrowRightIcon } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "hire-me@anshumat.org" && password === "HireMe@2025!") {
            localStorage.setItem("auth", "logged-in")
            router.push("/dashboard")
        } else {
            setError("Invalid credentials")
            // Shake animation effect logic could go here
        }
    }

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center p-4">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
                <MountainScene className="w-full h-full opacity-30 blur-sm" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mx-auto">
                            <span className="font-bold text-white text-2xl">B</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
                        <p className="text-zinc-400 text-sm">Offline-First Personal Finance</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-4">
                            <div className="relative group">
                                <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Access Dashboard <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-xs text-zinc-500">
                            Demo: <span className="font-mono text-zinc-400">hire-me@anshumat.org</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
