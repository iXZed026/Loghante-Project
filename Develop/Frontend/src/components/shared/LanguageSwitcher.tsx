"use client"
import { languages } from '@/data/languages';
import useActive from '@/hooks/useActive';
import { cn } from '@/lib/utils/cn';
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from "framer-motion";
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
        <div className='flex flex-col  justify-center w-18 mt-5' >
            <div className={cn(
                "flex justify-center items-center",
                " py-2 gap-1",
                "font-semibold",
                "cursor-pointer",
                className
            )}
                ref={dropDownRef}
                onClick={toggleHandler}
            >
                <GrLanguage />
                {locale.toUpperCase()}
                <IoMdArrowDropdown className='mt-2' />
            </div>
            <AnimatePresenceWrapper isActive={active}>
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className='border- flex flex-col items-center'
                >
                    {languages.map((lang) => (
                        <span
                            className='w-full text-center py-1 cursor-pointer border-b-2 border-black'
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