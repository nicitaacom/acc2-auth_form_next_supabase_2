import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/interfaces/types_db"

const supabaseRouteHandler = () => {
  cookies().getAll() // Keep cookies in the JS execution context for Next.js build
  return createRouteHandlerClient<Database>({ cookies })
}

export default supabaseRouteHandler
