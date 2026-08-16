import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import ProfileDashboardLinks from './ProfileDashboardLinks';
import { IoIosLogOut } from "react-icons/io";
import { useTranslations } from 'next-intl';

function ProfileDashboard() {

    const dashboardLinksT = useTranslations("profileDashboard")

    return (
        <div className="w-106 md:block hidden">
            <div className={cn(
                "p-8.5",
                "h-screen",
                "border-r-2 border-black/30",
                "fcol justify-between",
            )}>
                {/* Profile Dashboard Header */}
                <div className='fcol gap-3.5 mb-4'>
                    <AppImage
                        width={80}
                        height={60}
                        src="/images/loghanteh-logo.svg"
                        alt='loghanteh logo'
                    />
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
        </div>
    )
}

export default ProfileDashboard