"use client"
import { Button } from "@/components/ui"
import supabaseClient from "@/libs/supabaseClient"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await supabaseClient.auth.signOut()
    router.refresh()
  }

  return <Button onClick={logout}>Logout</Button>
}
