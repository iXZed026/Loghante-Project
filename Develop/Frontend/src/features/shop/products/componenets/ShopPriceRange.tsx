"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

const MIN_LIMIT = 0;
const MAX_LIMIT = 500_000_000;
const STEP = 10_000_000;

function parsePrice(value: string | null, fallback: number) {
    if (value === null || value.trim() === "") return fallback;

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return fallback;

    return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsedValue));
}

function getPrices(
    minPriceParam: string | null,
    maxPriceParam: string | null,
) {
    const minPrice = parsePrice(minPriceParam, MIN_LIMIT);
    const maxPrice = parsePrice(maxPriceParam, MAX_LIMIT);

    return minPrice < maxPrice
        ? { minPrice, maxPrice }
        : { minPrice: MIN_LIMIT, maxPrice: MAX_LIMIT };
}

function PriceRange() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();

    const T = useTranslations("shopProducts.filters");
    const commonT = useTranslations("common");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const [draftPrices, setDraftPrices] = useState(() => ({
        minPriceParam,
        maxPriceParam,
        ...getPrices(minPriceParam, maxPriceParam),
    }));

    const pricesMatchUrl =
        draftPrices.minPriceParam === minPriceParam &&
        draftPrices.maxPriceParam === maxPriceParam;

    const { minPrice, maxPrice } = pricesMatchUrl
        ? draftPrices
        : getPrices(minPriceParam, maxPriceParam);

    const updateMinPrice = (value: number) => {
        const nextValue = Math.max(
            MIN_LIMIT,
            Math.min(value, maxPrice - STEP),
        );

        setDraftPrices({
            minPriceParam,
            maxPriceParam,
            minPrice: nextValue,
            maxPrice,
        });
    };

    const updateMaxPrice = (value: number) => {
        const nextValue = Math.min(
            MAX_LIMIT,
            Math.max(value, minPrice + STEP),
        );

        setDraftPrices({
            minPriceParam,
            maxPriceParam,
            minPrice,
            maxPrice: nextValue,
        });
    };

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("page");

        if (minPrice <= MIN_LIMIT) {
            params.delete("minPrice");
        } else {
            params.set("minPrice", String(minPrice));
        }

        if (maxPrice >= MAX_LIMIT) {
            params.delete("maxPrice");
        } else {
            params.set("maxPrice", String(maxPrice));
        }

        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        });
    };

    const sliderStep = Math.max(
        STEP,
        Math.round((MAX_LIMIT - MIN_LIMIT) / 5000),
    );

    const minPercent =
        ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

    const maxPercent =
        ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100;

    const sliderClasses = cn(
        "pointer-events-none absolute inset-0 h-5 w-full",
        "appearance-none bg-transparent",
        "[&::-webkit-slider-runnable-track]:h-1",
        "[&::-webkit-slider-runnable-track]:bg-transparent",
        "[&::-moz-range-track]:h-1",
        "[&::-moz-range-track]:bg-transparent",
        "[&::-webkit-slider-thumb]:pointer-events-auto",
        "[&::-webkit-slider-thumb]:mt-[-6px]",
        "[&::-webkit-slider-thumb]:size-4",
        "[&::-webkit-slider-thumb]:appearance-none",
        "[&::-webkit-slider-thumb]:rounded-full",
        "[&::-webkit-slider-thumb]:border-2",
        "[&::-webkit-slider-thumb]:border-white",
        "[&::-webkit-slider-thumb]:bg-[var(--blue-color)]",
        "[&::-webkit-slider-thumb]:shadow-sm",
        "[&::-webkit-slider-thumb]:cursor-pointer",
        "[&::-moz-range-thumb]:pointer-events-auto",
        "[&::-moz-range-thumb]:size-4",
        "[&::-moz-range-thumb]:rounded-full",
        "[&::-moz-range-thumb]:border-2",
        "[&::-moz-range-thumb]:border-white",
        "[&::-moz-range-thumb]:bg-[var(--blue-color)]",
        "[&::-moz-range-thumb]:shadow-sm",
        "[&::-moz-range-thumb]:cursor-pointer",
    );

    const handlePriceInput = (
        value: string,
        type: "min" | "max",
    ) => {
        const numericValue = Number(value.replace(/,/g, ""));

        if (value === "") {
            if (type === "min") updateMinPrice(MIN_LIMIT);
            else updateMaxPrice(MAX_LIMIT);

            return;
        }

        if (!Number.isFinite(numericValue)) return;

        if (type === "min") {
            updateMinPrice(numericValue);
        } else {
            updateMaxPrice(numericValue);
        }
    };

    return (
        <section className="fcol gap-y-8 px-3 py-5">
            <h3 className="font-wulkan text-2xl font-bold text-black-utility">
                {T("price-range")}
            </h3>

            <div className="fbc gap-3 text-sm font-600 text-black-utility">
                <span>
                    {formatPrice(minPrice)} {commonT("price-type")}
                </span>

                <span>
                    {formatPrice(maxPrice)} {commonT("price-type")}
                </span>
            </div>

            {/* Price inputs */}
            <div className="grid grid-cols-2 gap-3">
                <label className="fcol min-w-0 gap-1 text-xs text-black-light-utility">
                    <span>{T("min-price")}</span>

                    <input
                        type="text"
                        inputMode="numeric"
                        value={formatPrice(minPrice)}
                        onChange={(event) =>
                            handlePriceInput(event.target.value, "min")
                        }
                        className="w-full min-w-0 rounded border border-black/20 bg-white px-2 py-2 text-sm text-black-utility outline-none transition-colors focus:border-blue-utility"
                    />
                </label>

                <label className="fcol min-w-0 gap-1 text-xs text-black-light-utility">
                    <span>{T("max-price")}</span>

                    <input
                        type="text"
                        inputMode="numeric"
                        value={formatPrice(maxPrice)}
                        onChange={(event) =>
                            handlePriceInput(event.target.value, "max")
                        }
                        className="w-full min-w-0 rounded border border-black/20 bg-white px-2 py-2 text-sm text-black-utility outline-none transition-colors focus:border-blue-utility"
                    />
                </label>
            </div>

            {/* Range slider */}
            <div className="relative mx-2 h-5" dir="ltr">
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--black-color)]/30" />

                <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--blue-color)]"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />

                <input
                    aria-label={T("min-price")}
                    type="range"
                    min={MIN_LIMIT}
                    max={MAX_LIMIT}
                    step={sliderStep}
                    value={minPrice}
                    onChange={(event) => {
                        updateMinPrice(Number(event.target.value));
                    }}
                    className={sliderClasses}
                />

                <input
                    aria-label={T("max-price")}
                    type="range"
                    min={MIN_LIMIT}
                    max={MAX_LIMIT}
                    step={sliderStep}
                    value={maxPrice}
                    onChange={(event) => {
                        updateMaxPrice(Number(event.target.value));
                    }}
                    className={sliderClasses}
                />
            </div>

            <Button
                onClick={applyPriceFilter}
                className={cn(
                    "w-full justify-center",
                    "bg-blue-utility text-white",
                    "transition-colors hover:bg-[var(--blue-hover-color)]",
                    "py-2.5",
                )}
            >
                {T("apply-price-button")}
            </Button>
        </section>
    );
}

export default PriceRange;
