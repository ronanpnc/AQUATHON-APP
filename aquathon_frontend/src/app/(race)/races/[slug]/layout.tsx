import { RaceManagerContextProvider } from "@/services/sockets/race"
import React from "react"

export default function RaceLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <RaceManagerContextProvider>
      {children}
    </RaceManagerContextProvider>
  )
}
