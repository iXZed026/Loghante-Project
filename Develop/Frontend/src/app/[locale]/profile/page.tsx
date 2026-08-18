import ProfileDashboardActivity from '@/features/profile/componenets/dashboard/ProfileDashboardActivity';
import ProfileNextVisitBox from '@/features/profile/componenets/dashboard/ProfileNextVisitBox';

function Dashboard() {
  return (
    <div>
      {/* Dashboard Header */}
      <div className='fcol gap-5 mb-5'>
        <h2 className='font-medium md:text-4xl text-2xl'>
          Dashboard
        </h2>
        <span
          className='lg:text-xl text-black-light-utility'
        >Welcome back,
          <span className='text-crimson'> Danyal Lotfi</span>
          <span > here’s a quick overview of your activity at Loghanteh</span>
        </span>

      </div>
      {/* Activity Boxes */}
      <ProfileDashboardActivity />
      {/* Next Visit Boxes */}
      <div>
        <ProfileNextVisitBox />
      </div>
      {/* Discover Museums Fesktop */}
      <div>

      </div>
    </div>
  )
}

export default Dashboard