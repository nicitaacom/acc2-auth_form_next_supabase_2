"use client"

import Image from "next/image"

import { BiUserCircle } from "react-icons/bi"
import { LogoutButton } from "./LogoutButton"
import { TUser } from "@/interfaces/IUser"
import useUserStore from "@/store/user/userStore"

interface UserIconProps {
  user: TUser
}

export default function UserIcon({ user }: UserIconProps) {
  const { avatarUrl, email } = useUserStore()

  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      {user ? (
        avatarUrl ? (
          <Image
            className="rounded-full cursor-pointer"
            src={avatarUrl}
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
      {email && JSON.stringify(email, null, 2)}
      {user && <LogoutButton />}
    </div>
  )
}
