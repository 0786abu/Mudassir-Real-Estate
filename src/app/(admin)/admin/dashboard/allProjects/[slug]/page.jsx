import React from 'react'
import AdminProjectDetail from './ProjectData';

const page = async({params}) => {
    const {slug} = await params;
  return (
    <div>
        <AdminProjectDetail  slug={slug}/>
    </div>
  )
}

export default page