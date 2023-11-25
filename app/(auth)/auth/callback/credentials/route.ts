import { pusherServer } from "@/libs/pusher"
import supabaseAdmin from "@/libs/supabaseAdmin"
import { getURL } from "@/utils/helpers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get code to exchange this code to cookies session in the future
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Redirect to error page if supabase throw error on recover
  const error_description = requestUrl.searchParams.get("error_description")
  if (error_description) {
    return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`) //throw error like this
  }

  /* Exchange code for cookies - update row that user confirmed email */
  if (code) {
    // Exchange code to get cookies session
    const supabase = createRouteHandlerClient({ cookies })
    const response = await supabase.auth.exchangeCodeForSession(code)

    // Update row that user verified email
    if (response.data.user && response.data.user.email) {
      await supabaseAdmin
        .from("users")
        .update({ email_confirmed_at: response.data.user.updated_at, providers: ["credentials"] })
        .eq("id", response.data.user.id)
      // Trigger pusher to 'auth:completed' to show in another tab message like 'Authencication completed - thank you'
      pusherServer.trigger(response.data.user.email, "auth:completed", response.data.user)
      revalidatePath("/")
    }
  } else {
    const error_description = encodeURIComponent("No user found after exchanging cookies for registration")
    return NextResponse.redirect(`${requestUrl.origin}/error?error_description=${error_description}`)
  }
  //Todo redirect to auth/callback/page.tsx and set data in LocalStorage
  return NextResponse.redirect(`${requestUrl.origin}/auth/completed?code=${code}`)
}
