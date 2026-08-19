import FadeUp from '@/components/animations/FadeUp'
import EditProfileForm from '@/features/profile/componenets/edit-profile/EditProfileForm'
import React from 'react'

function EditProfile() {
    return (
        <FadeUp>
            <div>
                {/* Edit Profile Header */}
                <div className='mb-10 fcol  gap-5'>
                    <h2 className='font-medium md:text-4xl text-2xl'>
                        My profile
                    </h2>
                    <span
                        className='lg:text-xl text-black-light-utility'
                    >
                        You can complete or edit your information here.
                    </span>
                </div>
                {/* Edit Profile Form  */}
                <EditProfileForm />
            </div>
        </FadeUp>
    )
}

export default EditProfile