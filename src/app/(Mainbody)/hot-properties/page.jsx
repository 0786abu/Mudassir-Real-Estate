import ProfileLoader from '@/components/common/Loader'
import HotProperties from '@/components/property/HotProperties'
import React, { Suspense } from 'react'

const page = ({searchParams}) => {
  return (
    <div>
      <Suspense fallback={<ProfileLoader/>} key={JSON.stringify(searchParams)}>
        <HotProperties searchParams={searchParams}/>
      </Suspense>
      </div>
  )
}

export default page