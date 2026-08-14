import AppImage from '@/components/ui/AppImage'
import React from 'react'

function AuthHeader() {
  return (
    <div className='fcol gap-10'>
      {/* Logo */}
      <div className='fcc'>
        <AppImage
          width={85}
          height={65}
          src={"/images/loghanteh-logo.svg"}
          alt="loghanteh logo"
          priority={true}
        />
      </div>
      {/* Checking Auth Route */}
    </div>
  )
}

export default AuthHeader