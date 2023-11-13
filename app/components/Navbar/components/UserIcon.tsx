import Image from "next/image"

import { BiUserCircle } from "react-icons/bi"
import { UserResponse } from "@supabase/supabase-js"
import { Session } from "next-auth"

interface UserIconProps {
  user:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
        expires?: string | null | undefined
      }
    | undefined
}

export default function UserIcon({ user }: UserIconProps) {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      {user ? (
        user.image ? (
          <Image
            className="rounded-full cursor-pointer"
            src={user.image}
            alt="profile_picture_url"
            width={32}
            height={32}
          />
        ) : (
          <Image
            className="rounded-full cursor-pointer"
            src="/placeholder.jpg"
            alt="profile_picture_url"
            width={32}
            height={32}
          />
        )
      ) : (
        <BiUserCircle className="cursor-pointer" size={32} />
      )}
      {JSON.stringify(user?.email, null, 2)}
    </div>
  )
}
