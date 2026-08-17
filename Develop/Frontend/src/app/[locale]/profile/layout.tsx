"use client"
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper';
import AppImage from '@/components/ui/AppImage'
import ProfileDashboard from '@/features/profile/componenets/ProfileDashboard'
import ProfileMobileHeader from '@/features/profile/componenets/ProfileMobileHeader';
import useActive from '@/hooks/useActive';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils/cn'
import { Children } from '@/types/children'
import { useLocale } from 'next-intl';
import { useRef } from 'react';

function ProfileLayout({
    children
}: {
    children: Children
}) {

    const [
        activeDashboard,
        activeDashboardHandler,
        UnActiveDashboardHandler,
        ,

    ] = useActive(false);

    const divElem =
        useRef<HTMLDivElement | null>(null)

    useClickOutside(
        divElem,
        UnActiveDashboardHandler,
    )

    return (
        <div className='flex'>
            {/* Profile Dashbord */}
            <div className='md:block hidden'>
                <ProfileDashboard isActive={activeDashboard} />
            </div>
            <div className='md:hidden block'>
                {/* BLACK BACKGROUND */}
                <AnimatePresenceWrapper isActive={activeDashboard}>
                    <div
                        className={cn(
                            "w-full h-[100vh]",
                            "bg-black/70",
                            "text-black-utility md:text-md text-sm",
                            "fixed top-0",
                            "z-40",
                        )}
                    >
                        <ProfileDashboard
                            isActive={activeDashboard}
                            divElem={divElem}
                            UnActiveDashboardHandler={UnActiveDashboardHandler}
                        />
                    </div>
                </AnimatePresenceWrapper>
            </div>
            <div className='w-full'>
                {/* Mobile Header */}
                <ProfileMobileHeader
                    activeDashboardHandler={activeDashboardHandler}
                />
                <div className="p-8 5">
                    {/* Pages */}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout