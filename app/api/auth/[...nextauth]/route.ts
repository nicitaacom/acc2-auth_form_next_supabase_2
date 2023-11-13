import supabaseRouteHandler from "@/libs/supabaseRouteHandler"

import NextAuth from "next-auth/next"
import authOptions from "@/../authOptions"
import { authConfig } from "@/libs/auth"

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
