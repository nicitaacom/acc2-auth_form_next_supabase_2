"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function AuthCompleted() {
  const router = useRouter()
  const params = useSearchParams().get("code")
  if (!params) {
    const error_description = encodeURIComponent("auth not completed")
    router.push(`/error?error=${error_description}`)
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-success">Auth completed - you may close this page</h1>
    </div>
  )
}
