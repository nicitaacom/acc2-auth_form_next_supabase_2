"use client"

import supabase from "@/libs/supabaseClient"

import { FiLogOut } from "react-icons/fi"

import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"

export default function LoginButton() {
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <form action={logout}>
      <Button variant="default-outline">
        Logout <FiLogOut />
      </Button>
    </form>
  )
}
