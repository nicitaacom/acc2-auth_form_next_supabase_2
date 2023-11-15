declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string

      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      SUPABASE_SERVICE_ROLE_KEY: string

      NEXT_PUBLIC_SUPPORT_EMAIL: string

      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string

      TWITTER_CLIENT_ID: string
      TWITTER_CLIENT_SECRET: string

      PUSHER_APP_ID: string
      NEXT_PUBLIC_PUSHER_APP_KEY: string
      PUSHER_SECRET: string
    }
  }
}

export {}
