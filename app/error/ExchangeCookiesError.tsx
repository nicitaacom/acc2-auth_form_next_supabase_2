"use client"

export function ExchangeCookiesError() {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="h-[35vh] w-full bg-brand" />
      <p className="text-danger">No user found when exchanging cookies</p>
      <p>In short, there is a mistake here</p>
      <p>You might verified your email on new device or in incognito mode</p>
      <p>To get support contact us here - {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</p>
    </div>
  )
}
