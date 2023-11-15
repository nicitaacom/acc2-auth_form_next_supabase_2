import supabaseServer from "@/libs/supabaseServer"
import { OpenAuthModalButton, UserIcon } from "./components"
import { useRouter } from "next/router"

export default async function Navbar() {
  const router = useRouter()
  const { data, error } = await supabaseServer().from("users").select().single()
  if (error) {
    router.push("/error?error_description=Error fetching user")
  }

  return (
    <nav className="px-8 py-4 flex justify-between items-center gap-x-4">
      <OpenAuthModalButton />
      <UserIcon user={data} />
    </nav>
  )
}
