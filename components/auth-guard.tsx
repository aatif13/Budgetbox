"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const auth = localStorage.getItem("auth")
        if (auth !== "logged-in") {
            router.push("/login")
        } else {
            setAuthorized(true)
        }
    }, [router])

    if (!authorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Verifying Access...
            </div>
        )
    }

    return <>{children}</>
}
