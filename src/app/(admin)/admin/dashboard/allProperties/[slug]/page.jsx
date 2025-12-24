import AdminPropertyDetail from '@/components/property/SingleProperty'
import React from 'react'

const page = async({params}) => {
    const {slug} = await params;
  return (
    <div>
        <AdminPropertyDetail slug={slug}/>
    </div>
  )
}

export default page