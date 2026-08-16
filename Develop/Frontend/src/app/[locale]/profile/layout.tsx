import ProfileDashboard from '@/features/profile/componenets/ProfileDashboard'
import { Children } from '@/types/children'

function ProfileLayout({
    children
}: {
    children: Children
}) {
    return (
        <div className='flex'>
            {/* Profile Dashbord */}
                <ProfileDashboard />
            {/* Pages */}
            <div className='w-full p-8.5'>
                {children}
            </div>
        </div>
    )
}

export default ProfileLayout