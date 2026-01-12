import React, { Suspense } from 'react'
import ProjectDetail from './Project';
import ProfileLoader from '@/components/common/Loader';

const page = async({params}) => {
  const {slug} = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createProject/${slug}`,{
    cache:"no-cache"
  });
  const data = await res.json()
  console.log(data)
  return (
    <div>
      <Suspense fallback={<ProfileLoader/>}>
        <ProjectDetail project={data?.project}/>
      </Suspense>
    </div>
  )
}

export default page