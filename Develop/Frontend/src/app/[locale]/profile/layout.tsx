import { Children } from '@/types/children'
import React from 'react'

function ProfileLayout({
    children
}: {
    children: Children
}) {
    return (
        <div>
            {/* Profile Dashbord */}
            <div>
                
            </div>
            {/* Pages */}
            {children}
        </div>
    )
}

export default ProfileLayout