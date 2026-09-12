"use client"

import { ReactNode, useEffect } from "react"
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

  useEffect(() => {

    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }

  }, [
    isLoading,
    isAuthenticated,
    router,
  ])

  if (isLoading || !isAuthenticated) {
    return null
  }

  return children
}

export default CheckAuthorized