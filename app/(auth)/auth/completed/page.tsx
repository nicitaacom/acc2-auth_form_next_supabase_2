"use client"

import { Timer } from "@/(auth)/auth/AuthModal/components"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AuthCompleted() {
  const router = useRouter()
  const params = useSearchParams().get("code")
  const provider = useSearchParams().get("provider")

  if (!params) {
    const error_description = encodeURIComponent("auth not completed")
    router.push(`/error?error=${error_description}`)
  }

  useEffect(() => {
    if (provider === "google" || provider === "twitter") router.push("/")
    //to prevent error about too many re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-success">Auth completed - you may close this page</h1>
      <Timer label="Redirect back to main after" seconds={5} action={() => router.replace("/")} />
    </div>
  )
}
