"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EmailLinkInvalidOrExpired } from "./EmailLinkInvalidOrExpired"

export default function Error() {
  const [error, setError] = useState("")
  const router = useRouter()
  const error_description = useSearchParams().get("error_description")
  const url = location.href
  useEffect(() => {
    if (url.includes("Email+link+is+invalid+or+has+expired")) {
      setError("Email link is invalid or has expired")
    }
  }, [])

  if (error === "Email link is invalid or has expired") {
    return <EmailLinkInvalidOrExpired />
  }

  // Get error details from URL

  return <div className="min-h-screen flex items-center justify-center"></div>
}
