"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CallbackPage() {
  //set data in zustand store

  const router = useRouter()

  useEffect(() => {
    router.replace("/")
  }, [router])
  return <div></div>
}
