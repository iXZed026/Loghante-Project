"use client"
import { languages } from '@/data/languages';
import useActive from '@/hooks/useActive';
import { cn } from '@/lib/utils/cn';
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import { dropdownVariants } from '@/lib/animations/variants';
import { IoMdArrowDropdown } from "react-icons/io";
import { GrLanguage } from 'react-icons/gr';
import { getLocalStorageItem, saveToLocalStorage } from '@/lib/utils/localStorage';
import { useEffect, useRef } from 'react';
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper';
import useClickOutside from '@/hooks/useClickOutside';

interface ILanguageSwitcherProps {
    className?: string
}

function LanguageSwitcher({
    className
}: ILanguageSwitcherProps
) {

    //custom hooks
    const {
        active,
        activeHandler,
        UnActiveHandler,
        toggleHandler,
    } = useActive(false)

    //next hooks
    const pathname = usePathname();
    const router = useRouter();

    //refs
    const dropDownRef =
        useRef<HTMLDivElement | null>(null)

    //geting language
    const locale = useLocale();


    useEffect(() => {
        const lang = getLocalStorageItem("lang")
        if (lang) {
            const newPath = pathname.replace(
                locale,
                lang,
            )
            router.push(newPath)
        }
    }, [])

    function changeLanguage(
        languageCode: string
    ): void {
        const newLocale = languageCode;
        saveToLocalStorage("lang", newLocale)

        const newPath = pathname.replace(
            locale,
            newLocale,
        )
        UnActiveHandler();
        router.push(newPath)

    }

    useClickOutside(
        dropDownRef,
        UnActiveHandler,
    )



    return (
        <div className={cn(
            "w-20",
            "flex flex-col  justify-center",
            "relative",
            active && "text-black-utility",
        )}>
            <div className={cn(
                "flex justify-center items-center",
                "py-2 gap-1",
                "font-semibold",
                "cursor-pointer",
                "rounded-t-sm",
                "transition-all ",
                "hover:bg-white/25",
                "click-scale",
                active && "bg-white",
                className
            )}
                ref={dropDownRef}
                onClick={toggleHandler}
            >
                <GrLanguage />
                {locale.toUpperCase()}
                <IoMdArrowDropdown className='' />
            </div>
            <AnimatePresenceWrapper isActive={active}>
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "w-full",
                        "flex flex-col items-center",
                        "absolute top-10",
                        "rounded-md",
                        active && "bg-white ",
                    )}
                >
                    {languages.map((lang) => (
                        <span
                            className='
                                w-full 
                                text-center 
                                py-3 
                                cursor-pointer
                                transition-all
                                hover:bg-gray-300/65
                                click-scale
                                '
                            key={lang.id}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.name}
                        </span>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>

        </div >
    )
}

export default LanguageSwitcher