"use client";

import { languages } from "@/data/languages";
import useActive from "@/hooks/useActive";
import { cn } from "@/lib/utils/cn";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import {
    getLocalStorageItem,
    saveToLocalStorage,
} from "@/lib/utils/localStorage";
import { dropdownVariants } from "@/lib/animations/variants";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import Button from "../ui/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useLocale } from "next-intl";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";

interface ILanguageSwitcherProps {
    className?: string;
    isScrolled?: boolean;
    background?: string;
}

function LanguageSwitcher({
    className,
    isScrolled = false,
    background = "var(--crimson-color)",
}: ILanguageSwitcherProps) {
    const [
        activeLanguageDropDown,
        ,
        UnActiveLanguageDropDownHandler,
        toggleLanguageDropDownHandler,
    ] = useActive(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useLocale();

    const dropDownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const savedLanguage = getLocalStorageItem("lang");

        if (
            savedLanguage &&
            savedLanguage !== locale &&
            languages.some((language) => language.code === savedLanguage)
        ) {
            const newPath = pathname.replace(
                `/${locale}`,
                `/${savedLanguage}`,
            );

            const queryString = searchParams.toString();
            const finalPath = queryString
                ? `${newPath}?${queryString}`
                : newPath;

            router.push(finalPath, { scroll: false });
        }
    }, [locale, pathname, router, searchParams]);

    function changeLanguage(languageCode: string): void {
        if (languageCode === locale) {
            UnActiveLanguageDropDownHandler();
            return;
        }

        saveToLocalStorage("lang", languageCode);

        const newPath = pathname.replace(
            `/${locale}`,
            `/${languageCode}`,
        );

        const queryString = searchParams.toString();
        const finalPath = queryString
            ? `${newPath}?${queryString}`
            : newPath;

        UnActiveLanguageDropDownHandler();

        router.push(finalPath, { scroll: false });
    }

    useClickOutside(
        dropDownRef,
        UnActiveLanguageDropDownHandler,
    );

    const activeLanguage = languages.find(
        (language) => language.code === locale,
    );

    return (
        <div
            className={cn(
                "relative z-20",
                "flex flex-col justify-center",
                className,
            )}
        >
            {/* Trigger */}
            <div
                ref={dropDownRef}
                className={cn(
                    "flex items-center justify-center gap-1",
                    "py-2 md:py-3",
                    "font-semibold",
                    "cursor-pointer",
                    "transition-colors duration-200",
                    "click-scale",

                    background != "var(--crimson-color)" ? "text-[var(--gold-color)]"
                    :"text-[var(--white-color)]",
                    "rounded-lg",
                    !activeLanguageDropDown && [
                        "md:bg-transparent",
                        "md:hover:bg-white/15",
                        "hover:bg-black/20",
                    ],
                    isScrolled && "text-gold-utility",
                    activeLanguageDropDown && [
                        "text-white-utility",
                        "rounded-b-none",
                    ],
                )}
                style={{
                    backgroundColor: activeLanguageDropDown
                        ? background
                        : undefined,
                }}
                onClick={toggleLanguageDropDownHandler}
            >
                <GrLanguage />

                {activeLanguage?.name &&
                    getLocalizedValue(activeLanguage.name, locale)}

                <IoMdArrowDropdown
                    className={cn(
                        "transition-transform duration-300",
                        activeLanguageDropDown && "rotate-180",
                    )}
                />
            </div>

            {/* Dropdown */}
            <AnimatePresenceWrapper
                isActive={activeLanguageDropDown}
            >
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute",
                        "flex w-full flex-col items-center",
                        "overflow-hidden",
                        "text-white-utility",
                        "shadow-lg",
                        "bottom-full rounded-t-md",
                        "md:bottom-auto md:top-full",
                        "md:rounded-t-none md:rounded-b-md",
                    )}
                    style={{ backgroundColor: background }}
                >
                    {languages.map((language) => (
                        <Button
                            key={language.id}
                            className={cn(
                                "w-full py-3",
                                "text-center text-white-utility",
                                "cursor-pointer",
                                "transition-colors duration-200",
                                "hover:bg-white/15",
                                "click-scale",
                                language.code === locale &&
                                    "font-bold",
                            )}
                            onClick={() =>
                                changeLanguage(language.code)
                            }
                        >
                            {getLocalizedValue(
                                language.name,
                                locale,
                            )}
                        </Button>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>
        </div>
    );
}

export default LanguageSwitcher;