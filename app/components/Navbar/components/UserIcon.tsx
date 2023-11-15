import Image from "next/image"

import { BiUserCircle } from "react-icons/bi"

interface UserIconProps {
  user: {
    avatarUrl: string | null
    created_at: string
    email: string
    email_confirmed_at: string | null
    id: string
    role: string
    username: string
  } | null
}

export default function UserIcon({ user }: UserIconProps) {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      {user ? (
        user.avatarUrl ? (
          <Image
            className="rounded-full cursor-pointer"
            src={user.avatarUrl}
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
