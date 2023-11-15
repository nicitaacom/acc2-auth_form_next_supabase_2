"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EmailLinkInvalidOrExpired } from "./EmailLinkInvalidOrExpired"
import { ExchangeCookiesError } from "./ExchangeCookiesError"
import { AuthNotCompleted } from "./AuthNotCompleted"

export default function Error() {
  const [error, setError] = useState("")
  const error_description = useSearchParams().get("error_description")
  const url = typeof window !== "undefined" ? window.location.href : ""

  useEffect(() => {
    if (url.includes("Email+link+is+invalid+or+has+expired")) {
      setError("Email link is invalid or has expired")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error === "Email link is invalid or has expired") {
    return <EmailLinkInvalidOrExpired />
  }
  if (error_description === "No user found after exchanging cookies for registration") {
    return <ExchangeCookiesError message="No user found after exchanging cookies for registration" />
  }
  if (error_description === "No user found after exchanging cookies for recovering") {
    return <ExchangeCookiesError message="No user found after exchanging cookies for recovering" />
  }
  if (error_description === "You have no access to this route - your auth not completed") {
    return <AuthNotCompleted />
  }

  // Get error details from URL

  return (
    <div className="min-h-screen flex items-center justify-center">
      {error_description ? <p>{error_description}</p> : <p>Unknown error occurred</p>}
      <p>Please let us know how you got this error here - {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</p>
    </div>
  )
}
