import { Button } from "@/components/ui"
import Image from "next/image"

import { BiUserCircle } from "react-icons/bi"
import { LogoutButton } from "./LogoutButton"
import { TUser } from "@/interfaces/IUser"

interface UserIconProps {
  user: TUser
}

export default function UserIcon({ user }: UserIconProps) {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      {user ? (
        user.avatar_url ? (
          <Image
            className="rounded-full cursor-pointer"
            src={user.avatar_url}
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
      {user && <LogoutButton />}
    </div>
  )
}
