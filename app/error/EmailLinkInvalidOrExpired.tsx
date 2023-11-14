"use client"

import { useState } from "react"
import supabaseClient from "@/libs/supabaseClient"

import { Button } from "@/components/ui"

export function EmailLinkInvalidOrExpired() {
  const [responseMessage, setResponseMessage] = useState<React.ReactNode>(<p></p>)

  function displayResponseMessage(message: React.ReactNode) {
    setResponseMessage(message)
  }

  async function resendVerificationEmail(email: string) {
    try {
      const { error } = await supabaseClient.auth.resend({
        type: "signup",
        email: email,
      })
      if (error) throw error
      displayResponseMessage(
        <div className="flex flex-col">
          <p className="text-success">Message resended</p>
          <p>If you don&apos;t recieve an email - check &apos;Spam&apos; and &apos;All mail&apos;</p>
        </div>,
      )
    } catch (error) {
      if (error instanceof Error) {
        displayResponseMessage(<p className="text-danger">{error.message}</p>)
        console.error("Login with email - ", error.message)
      } else {
        displayResponseMessage(
          <div className="text-danger flex flex-row">
            <p>An unknown error occurred - contact admin&nbsp;</p>
            <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
              here
            </Button>
          </div>,
        )
        console.error("Unknown error - ", error)
      }
    }
  }

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="h-[35vh] w-full bg-brand" />
      <p className="text-danger">Email link is invalid or has expired</p>
      <p>In short, there is a mistake here</p>
      <Button>resend</Button>
    </div>
  )
}
