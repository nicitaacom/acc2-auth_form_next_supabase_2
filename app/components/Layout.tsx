"use client"

import React, { useEffect } from "react"

import useDarkMode from "@/store/ui/darkModeStore"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const darkMode = useDarkMode()

  //children in client component is server component by default https://www.youtube.com/watch?v=c8Q_Kp_lDng
  useEffect(() => {
    const htmlElement = document.documentElement
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial mode based on system preference
    htmlElement.classList.toggle("light", !prefersDarkMode)
    htmlElement.classList.toggle("dark", prefersDarkMode)

    // Update mode when darkMode state changes
    htmlElement.classList.toggle("light", !darkMode.isDarkMode)
    htmlElement.classList.toggle("dark", darkMode.isDarkMode)
  })

  return (
    <div
      className="bg-background text-title
    min-h-screen transition-colors duration-300">
      {children}
    </div>
  )
}
