import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, NextRequest } from "next/server"
import type { Database } from "@/interfaces/types_db"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}
