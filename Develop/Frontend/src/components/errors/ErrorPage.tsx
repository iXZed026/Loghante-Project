"use client"

import AppImage from "../ui/AppImage"
import Button from "../ui/Button"
import Container from "../shared/Container"
import "@/features/shop/styles/shop.css"



import {
    poppins,
    wulkan,
} from "@/font"

import { cn } from "@/lib/utils/cn"

import {
    usePathname,
    useRouter,
} from "next/navigation"

import Link from "next/link"

interface IErrorPage {
    statusCode: number | string
    message: string
    tryAgainButton?: boolean
    onTryAgain?: () => void
}

function ErrorPage({
    statusCode,
    message,
    tryAgainButton = false,
    onTryAgain,
}: IErrorPage) {

    const router = useRouter()
    const pathname = usePathname()

    const font = `${poppins.variable} ${wulkan.variable}`

    const locale = pathname?.split("/")[1] || "en"

    const isShopPage = /^\/(en|fa)\/shop(?:\/|$)/.test(pathname ?? "")

const errorColor = isShopPage
    ? "#03003D"
    : "var(--crimson-color)"

    return (
        <Container>
            <main
                className={cn(
                    "min-h-screen",
                    "fcc",
                    font,
                )}
                style={{
                    "--error-color": errorColor,
                } as React.CSSProperties}
            >
                <div
                    className="
                        min-h-[80vh]
                        w-full
                        fcol
                        md:gap-3
                        gap-15
                    "
                >
                    {/* Loghanteh Logo */}
                    <div className="fcc">
                        <Link href={`/${locale}`}>
                            <AppImage
                                width={80}
                                height={60}
                                src="/images/Loghanteh-logo.svg"
                                alt="Loghanteh logo"
                            />
                        </Link>
                    </div>

                    {/* Errors Text */}
                    <div
                        className="
                            fcol
                            items-center
                            gap-15
                            text-center
                        "
                    >
                        <span
                            className="
                                font-wulkan
                                md:text-[200px]
                                text-9xl
                                font-bold
                                text-[var(--error-color)]
                            "
                        >
                            {statusCode}
                        </span>

                        <span
                            className="
                                md:text-3xl
                                text-xl
                            "
                        >
                            {message}
                        </span>

                        <div
                            className="
                                md:w-115
                                w-full
                                fcc
                                gap-8
                            "
                        >
                            {/* Error Line */}
                            <div
                                className="
                                    h-[2.5px]
                                    w-full
                                    rounded-2xl
                                    bg-[var(--error-color)]
                                "
                            />

                            <div className="rotate-45">
                                <div
                                    className="
                                        border-4
                                        border-[var(--error-color)]
                                        p-[3px]
                                    "
                                >
                                    <div
                                        className="
                                            bg-[var(--error-color)]
                                            p-1
                                        "
                                    />
                                </div>
                            </div>

                            {/* Error Line */}
                            <div
                                className="
                                    h-[2.5px]
                                    w-full
                                    rounded-2xl
                                    bg-[var(--error-color)]
                                "
                            />
                        </div>

                        {tryAgainButton ? (
                            <Button
                                type="button"
                                className="
                                    rounded-sm
                                    bg-[var(--error-color)]
                                    px-6
                                    py-2
                                    text-sm
                                    font-semibold
                                "
                                onClick={onTryAgain}
                            >
                                Try Again
                            </Button>
                        ) : (
                            <>
                                <p
                                    className="
                                        font-light
                                        md:text-xl
                                        text-lg
                                    "
                                >
                                    Let’s get you back on the right path.
                                </p>

                                <Button
                                    type="button"
                                    className="
                                        rounded-sm
                                        bg-[var(--error-color)]
                                        px-6
                                        py-2
                                        text-sm
                                        font-semibold
                                    "
                                    onClick={() => router.back()}
                                >
                                    Back
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </Container>
    )
}

export default ErrorPage
