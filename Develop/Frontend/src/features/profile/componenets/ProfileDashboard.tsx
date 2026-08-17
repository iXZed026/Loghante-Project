import AppImage from '@/components/ui/AppImage'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import ProfileDashboardLinks from './ProfileDashboardLinks';
import { IoIosLogOut } from "react-icons/io";
import { useLocale, useTranslations } from 'next-intl';
import { openSlideMenu, openSlideMenuFa } from '@/lib/animations/variants';
import { motion } from "framer-motion";
import { RefObject } from 'react';
import { IoMdClose } from "react-icons/io";

interface IProfileDashboard {
    isActive: boolean;
    divElem?: RefObject<HTMLDivElement | null>;
    UnActiveDashboardHandler?: () => void
}

function ProfileDashboard({
    isActive,
    divElem,
    UnActiveDashboardHandler,
}: IProfileDashboard) {

    const dashboardLinksT = useTranslations("profileDashboard")
    const locale = useLocale()

    return (
        <motion.div
            variants={
                locale !== "fa" ?
                    openSlideMenu :
                    openSlideMenuFa
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
                "w-106",
                "bg-white-utility",
                isActive
                    ? locale === "fa"
                        ? "fixed top-0 right-0"
                        : "fixed top-0 left-0"
                    : "md:block hidden",
            )}
            ref={divElem}
        >
            <div className={cn(
                "p-8.5",
                "h-screen",
                " border-black/30",
                locale === "fa" ? "border-l-2" : "border-r-2",
                "fcol justify-between",
            )}>

                {/* Profile Dashboard Header */}
                <div className='fcol gap-3.5 mb-4'>

                    <div className='fbc'>
                        <AppImage
                            width={80}
                            height={60}
                            src="/images/loghanteh-logo.svg"
                            alt='loghanteh logo'
                        />

                        <IoMdClose
                            className={cn(
                                "size-6",
                                "transition-all",
                                "hover:opacity-65",
                                "click-scale",
                                "cursor-pointer",
                                "md:hidden"
                            )}
                            onClick={UnActiveDashboardHandler}
                        />
                    </div>

                    <h1 className='font-bold text-2xl'>
                        {dashboardLinksT("title")}
                    </h1>

                    <span className='text-xl font-light'>
                        Danyal Lotfi
                    </span>

                    {/* Profile Dashboard Page Links */}
                    <ProfileDashboardLinks />

                </div>

                {/* Profile Dashboard LogOut */}
                <div >
                    <Button
                        className={cn(
                            "w-full",
                            "p-5",
                            "text-black-utility font-semibold",
                            "flex items-center gap-3",
                            "transition-all duration-300",
                            "active:pl-1",
                            "hover:pl-7",
                        )}
                    >
                        <IoIosLogOut className='size-6 text-crimson' />
                        {dashboardLinksT("logout")}
                    </Button>
                </div>

            </div >
        </motion.div>
    )
}

export default ProfileDashboard