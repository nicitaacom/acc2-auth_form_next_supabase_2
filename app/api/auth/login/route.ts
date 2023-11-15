import supabaseAdmin from "@/libs/supabaseAdmin"
import { NextResponse } from "next/server"

export type TAPIAuthLogin = {
  username: string
}

export async function POST(req: Request) {
  const body: TAPIAuthLogin = await req.json()

  try {
    const { data: email, error: emailSelectError } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("username", body.username)
      .single()
    const email_response = email?.email

    if (emailSelectError) {
      throw new Error(`Error selecting email with this username ${emailSelectError}`)
    }
    return NextResponse.json({ email: email_response })
  } catch (error) {
    return NextResponse.json({ error: error })
  }
}
