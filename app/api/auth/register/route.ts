import supabaseServer from "@/libs/supabaseServer"
import { NextResponse } from "next/server"

import { getURL } from "@/utils/helpersSSR"

import list from "disposable-email-domains"

export type TAPIRegister = {
  username: string
  email: string
  password: string
}

export async function POST(req: Request) {
  const { username, email, password }: TAPIRegister = await req.json()

  //basic check for temp-emails
  async function isDisposable(email: string) {
    return list.includes(email.split("@")[1])
  }

  try {
    if (await isDisposable(email)) {
      throw new Error(`It seems like you use temp-mail - please use actuall email\n
    So you can recover your password and get access to support`)
    }

    const { data: user, error: signUpError } = await supabaseServer().auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${getURL()}/auth/callback`,
      },
    })
    return NextResponse.json({ user })
  } catch (error) {
    console.log(38, `api/auth/register\n ${error}`)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }
  // check if user exists - throw error

  // if (signUpError) throw new Error(`Sign up error\n ${signUpError}`)
  // console.log(19, "data - ", user)
}
