"use client"

import { useState } from "react"

export function EmailLinkInvalidOrExpired() {
  const [responseMessage, setResponseMessage] = useState<React.ReactNode>(<p></p>)

  function displayResponseMessage(message: React.ReactNode) {
    setResponseMessage(message)
  }

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="h-[35vh] w-full bg-brand" />
      <p className="text-danger">Email link is invalid or has expired</p>
      <p>In short, there is a mistake here</p>
      <p>Try again and use link that you become ASAP</p>
      <p>Also don&apos;t use link that you already used</p>
    </div>
  )
}
