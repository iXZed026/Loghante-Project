"use client"

import { ReactNode } from "react"
import { useProfile } from "@/contexts/ProfileProvider"
import { useRouter } from "next/navigation"

interface CheckAuthorizedProps {
  children: ReactNode
}

function CheckAuthorized({
  children,
}: CheckAuthorizedProps) {

  const {
    isAuthenticated,
    isLoading,
  } = useProfile()

  const router = useRouter()

  if (isLoading || !isAuthenticated) {
    router.back()
    return null
  }

  return children
}

export default CheckAuthorized