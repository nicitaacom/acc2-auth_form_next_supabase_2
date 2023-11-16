import supabaseAdmin from "@/libs/supabaseAdmin"
import { getURL } from "@/utils/helpers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  //If supabase put something in error_description - show it on error page
  const error_description = requestUrl.searchParams.get("error_description")
  if (error_description) {
    const supabase_error_description = encodeURIComponent(error_description)
    return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${supabase_error_description}`)
  }

  // exchange cookies for session and set avatar url
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.exchangeCodeForSession(code)
    if (response.data.user && response.data.user.email) {
      // Insert row if user doesn't exist
      await supabaseAdmin.from("users").insert({
        id: response.data.user.id,
        username: response.data.user.user_metadata.name,
        email: response.data.user.email,
        email_confirmed_at: response.data.user.email_confirmed_at,
      })

      // Replace avatar_url if !avatar_url
      const { data, error: selectAvatarError } = await supabaseAdmin
        .from("users")
        .select("avatar_url")
        .eq("email", response.data.user.email)
        .single()
      if (selectAvatarError) throw selectAvatarError
      if (!data?.avatar_url) {
        await supabaseAdmin
          .from("users")
          .update({
            email_confirmed_at: response.data.user.updated_at,
            avatar_url: response.data.user.user_metadata.avatar_url,
          })
          .eq("id", response.data.user.id)
      }
    } else {
      const error_description = encodeURIComponent("No user found after exchanging cookies for registration")
      return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`)
    }
  }
  return NextResponse.redirect(`${getURL()}`)
}
