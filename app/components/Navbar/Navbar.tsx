import { OpenAuthModalButton, UserIcon } from "./components"
import { useSession } from "next-auth/react"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="px-8 py-4 flex justify-between items-center gap-x-4">
      <OpenAuthModalButton />
      <UserIcon user={session?.user} />
    </nav>
  )
}
