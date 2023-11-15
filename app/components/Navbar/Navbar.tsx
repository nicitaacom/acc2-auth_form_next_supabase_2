import supabaseServer from "@/libs/supabaseServer"
import { OpenAuthModalButton, UserIcon } from "./components"

export default async function Navbar() {
  const { data } = await supabaseServer().from("users").select().single()

  return (
    <nav className="px-8 py-4 flex justify-between items-center gap-x-4">
      <OpenAuthModalButton />
      <UserIcon user={data} />
    </nav>
  )
}
