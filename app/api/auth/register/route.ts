import { NextResponse } from "next/server"

import { getURL } from "@/utils/helpers"

import list from "disposable-email-domains"
import supabaseAdmin from "@/libs/supabaseAdmin"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export type TAPIAuthRegister = {
  username: string
  email: string
  password: string
}

export async function POST(req: Request) {
  const { username, email, password }: TAPIAuthRegister = await req.json()
  const supabase = createRouteHandlerClient({ cookies })

  //basic check for temp-emails
  async function isDisposable(email: string) {
    return list.includes(email.split("@")[1])
  }

  try {
    if (await isDisposable(email)) {
      throw new Error(`It seems like you use temp-mail - please use actuall email\n
    So you can recover your password and get access to support`)
    }

    // Check if user with this email already exists not verified email
    const { data } = await supabaseAdmin.from("users").select("email,email_confirmed_at").eq("email", email).single()
    if (data?.email === email && data.email_confirmed_at) {
      throw new Error("This user already exists")
    }
    if (data?.email === email && !data.email_confirmed_at) {
      const { error: resendError } = await supabaseAdmin.auth.resend({
        type: "signup",
        email: email,
      })
      if (resendError) throw resendError
      throw new Error("User exists - check your email\n You might not verified your email")
    }

    // Check if user with this email already exists OAuth

    // Check if user with this email already exists Credentials

    // Inser row in 'users' table for a new user
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${getURL()}auth/callback`,
      },
    })
    if (signUpError) throw new Error(`api/auth/register/route.ts \n ${signUpError}`)
    if (user && user.user?.id) {
      const { error: insertError } = await supabaseAdmin
        .from("users")
        .insert({ id: user.user.id, username: username, email: email })

      if (insertError) {
        insertError.message.includes("duplicate key value")
        throw new Error(`User with this email already exists`)
      }
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }
}
