import React from "react"
import Image from "next/image"
import { signIn } from "next-auth/react"

import supabaseClient from "@/libs/supabaseClient"
import { Button } from "@/components/ui/Button"

export default function ContinueWithButton({ provider }: { provider: "google" | "faceit" | "twitter" }) {
  async function continueWith(e: React.FormEvent) {
    e.preventDefault()
    if (provider === "google") {
      const responseGoogle = await signIn("google")
      console.log(13, "responseGoogle - ", responseGoogle)
    } else if (provider === "faceit") {
      //do stuff
    } else if (provider === "twitter") {
      const responseTwitter = await signIn("twitter")
      console.log(13, "responseTwitter - ", responseTwitter)
    }
  }

  return (
    <form onSubmit={continueWith}>
      <Button className="min-h-[48px]" variant="continue-with">
        {provider === "google" ? (
          <Image src="/google.png" alt="Continue with Google" width={24} height={24} priority />
        ) : provider === "faceit" ? (
          <Image src="/faceit.png" alt="Continue with Faceit" width={24} height={24} priority />
        ) : (
          <Image src="/twitter.png" alt="Continue with Twitter" width={24} height={24} priority />
        )}
      </Button>
    </form>
  )
}
