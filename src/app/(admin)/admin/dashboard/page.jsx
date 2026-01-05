import React, { Suspense } from 'react'
import Dashboard from './DashboardComponent'
import ProfileLoader from '@/components/common/Loader';
import { cookies } from 'next/headers';

const page = async() => {
     const cookieStore = await cookies();
     
    const statsData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard_stats`,{
            cache:"no-store",
           headers: {
      Cookie: cookieStore.toString(), // ✅ MOST IMPORTANT
    },
        });
        const data = await statsData.json();
        const { firstStat, secondStat,typeStats,paymentStats,recentProperties,myProperties} = data;
  return (
    <div>
        <Suspense fallback={<ProfileLoader/>}>
          <Dashboard firstStat={firstStat} secondStat={secondStat} typeStats={typeStats} paymentStats={paymentStats} recentProperties={recentProperties} myProperties={myProperties} />
        </Suspense>
    </div>
  )
}

export default page