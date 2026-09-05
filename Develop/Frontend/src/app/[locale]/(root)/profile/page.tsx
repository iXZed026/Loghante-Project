import FadeUp from '@/components/animations/FadeUp';
import ProfileDashboardActivity from '@/features/loghante(root)/profile/componenets/dashboard/ProfileDashboardActivity';
import ProfileDiscoverMuseums from '@/features/loghante(root)/profile/componenets/dashboard/ProfileDiscoverMuseums';
import ProfileNextVisitBox from '@/features/loghante(root)/profile/componenets/dashboard/ProfileNextVisitBox';

import { useTranslations } from 'next-intl';

function Dashboard() {

  const dashboardPageT = useTranslations("profileDashboardPage")

  return (
    <FadeUp>
      <div className='fcol gap-5'>
        {/* Dashboard Header */}
        <div className='fcol gap-5'>
          <h2 className='font-medium md:text-4xl text-2xl'>
            {dashboardPageT("title")}
          </h2>
          <span
            className='lg:text-xl text-black-light-utility'
          >
            {dashboardPageT("sub-title-first-section")}
            <span className='text-crimson'> Danyal Lotfi</span>
            <span>
              {dashboardPageT("sub-title-second-section")}
            </span>
          </span>

        </div>
        {/* Activity Boxes */}
        <ProfileDashboardActivity
          dashboardPageT={dashboardPageT}
        />
        {/* Next Visit Boxes */}
        <div>
          <ProfileNextVisitBox
            dashboardPageT={dashboardPageT}
          />
        </div>
        {/* Discover Museums Desktop */}
        <div className='xl:block hidden'>
          <ProfileDiscoverMuseums
            dashboardPageT={dashboardPageT}
          />
        </div>
      </div>
    </FadeUp>
  )
}

export default Dashboard