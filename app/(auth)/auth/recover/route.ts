import { getURL } from "@/utils/helpers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get code to exchange this code to cookies session in the future
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Redirect to error page if supabase throw error on recover
  const error_description = requestUrl.searchParams.get("error_description")
  if (error_description) {
    return NextResponse.redirect(`${requestUrl.origin}/error`)
  }
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.exchangeCodeForSession(code)
    if (response.data.user && response.data.user.email) {
      cookies().set("email", response.data.user.email)
    } else {
      const error_description = encodeURIComponent("No user found after exchanging cookies for recovering")
      return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`)
    }
    return NextResponse.redirect(`${getURL()}?modal=AuthModal&variant=resetPassword&code=${code}`)
  }
}
