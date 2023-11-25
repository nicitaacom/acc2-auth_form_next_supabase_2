"use client"

import supabaseClient from "@/libs/supabaseClient"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui"
import useUserStore from "@/store/user/userStore"

export function LogoutButton() {
  const router = useRouter()
  const userStore = useUserStore()

  async function logout() {
    await supabaseClient.auth.signOut()
    userStore.logoutUser()
    router.refresh()
  }

  return <Button onClick={logout}>Logout</Button>
}
