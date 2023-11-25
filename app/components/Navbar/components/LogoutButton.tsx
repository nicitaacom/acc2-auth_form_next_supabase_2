"use client"
import { Button } from "@/components/ui"
import supabaseClient from "@/libs/supabaseClient"
import useUserStore from "@/store/user/userStore"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const userStore = useUserStore()

  async function logout() {
    await supabaseClient.auth.signOut()
    router.refresh()
    userStore.logoutUser()
  }

  return <Button onClick={logout}>Logout</Button>
}
