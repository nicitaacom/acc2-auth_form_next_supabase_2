declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string

      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string

      TWITTER_CLIENT_ID: string
      TWITTER_CLIENT_SECRET: string
    }
  }
}

export {}
