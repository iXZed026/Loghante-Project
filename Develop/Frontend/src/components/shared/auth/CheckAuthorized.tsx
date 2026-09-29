"use client"

import { ReactNode, useEffect } from "react"
import { useProfile } from "@/contexts/ProfileProvider"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

interface CheckAuthorizedProps {
  children: ReactNode
}

function CheckAuthorized({
  children,
}: CheckAuthorizedProps) {

  const locale = useLocale()
  const router = useRouter()

  const {
    isAuthenticated,
    isLoading,
  } = useProfile()

  useEffect(() => {

    if (!isLoading && !isAuthenticated) {
      router.replace(`/${locale}/login`)
    }

  }, [
    isLoading,
    isAuthenticated,
    router,
    locale,
  ])

  if (isLoading || !isAuthenticated) {
    return null
  }

  return children
}

export default CheckAuthorized
