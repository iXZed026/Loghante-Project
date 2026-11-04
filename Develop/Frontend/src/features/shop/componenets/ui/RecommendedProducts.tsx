import React from "react"
import ProductBoxexWrraper from "./ProductBoxexWrraper"
import AppLink from "@/components/ui/AppLink"
import ArrowIcon from "@/components/shared/ArrowIcon"
import { useTranslations } from "next-intl"

interface IRecommendedProducts {
    endPointAPI: string
    title: string
    description?: string
    museumId?: number
}

function RecommendedProducts({
    endPointAPI,
    title,
    description,
    museumId,
}: IRecommendedProducts) {
    const t = useTranslations("common")

    return (
        <div>
            <div className="fbc">
                <div className="fcol w-full gap-y-5 md:w-130">
                    <h3 className="font-wulkan text-3xl font-bold sm:text-4xl">
                        {title}
                    </h3>
                    {description && (
                        <h6 className="text-sm text-black-light-utility sm:text-base">
                            {description}
                        </h6>
                    )}
                </div>

                <div className="w-4/6 md:w-auto">
                    <AppLink
                        href="/products"
                        className="fec px-3 py-2 text-sm transition-colors hover:text-(--black-light-color)"
                    >
                        <span>{t("view-all-product")}</span>
                        <ArrowIcon />
                    </AppLink>
                </div>
            </div>

            <ProductBoxexWrraper
                endPointAPI={endPointAPI}
                museumId={museumId}
            />
        </div>
    )
}

export default RecommendedProducts