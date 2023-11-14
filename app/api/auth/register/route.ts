import supabaseServer from "@/libs/supabaseServer"
import { NextResponse } from "next/server"

export type TAPIRegister = {
  username: string
  email: string
  password: string
}

export async function POST(req: Request) {
  const { username, email, password }: TAPIRegister = await req.json()

  // check if user exists - throw error

  const { data: user, error: signUpError } = await supabaseServer().auth.signUp({
    email: email,
    password: password,
    options: { emailRedirectTo: `${location.origin}/auth/callback` },
  })
  if (signUpError) throw new Error(`Sign up error\n ${signUpError}`)
  console.log(19, "data - ", user)
  return NextResponse.json({ user })
}
