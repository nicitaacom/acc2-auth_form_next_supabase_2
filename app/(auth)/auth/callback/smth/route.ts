import supabaseAdmin from "@/libs/supabaseAdmin"
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
    console.log(14, "response - ", response.data)
    if (response.data.user) {
      const { data, error } = await supabaseAdmin
        .from("users")
        .update({ email_confirmed_at: response.data.user.updated_at })
        .eq("id", response.data.user.id)

      //TODO - trigger pusher to email
    } else {
      return NextResponse.redirect(
        `${requestUrl.origin}/error?error_description=No user found after exchanging cookies`,
      )
    }
  }

  return NextResponse.redirect(requestUrl.origin)
}
