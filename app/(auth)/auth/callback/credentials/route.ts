import { pusherServer } from "@/libs/pusher"
import supabaseAdmin from "@/libs/supabaseAdmin"
import { getURL } from "@/utils/helpers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error_description = requestUrl.searchParams.get("error_description")
  if (error_description) {
    return NextResponse.redirect(`${requestUrl.origin}/error`)
  }
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.exchangeCodeForSession(code)
    if (response.data.user && response.data.user.email) {
      await supabaseAdmin
        .from("users")
        .update({ email_confirmed_at: response.data.user.updated_at })
        .eq("id", response.data.user.id)
      pusherServer.trigger(response.data.user.email, "auth:completed", response.data.user)
    } else {
      const error_description = encodeURIComponent("No user found after exchanging cookies for registration")
      return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`)
    }
  }
  return NextResponse.redirect(`${getURL()}auth/completed?code=${code}`)
}
