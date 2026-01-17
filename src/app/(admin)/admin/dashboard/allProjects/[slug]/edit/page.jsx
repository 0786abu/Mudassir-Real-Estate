import React from 'react'
import EditProject from './ProjectDet';

const page = async({params}) => {
    const {slug} = await params;
  return (
    <div>
        <EditProject slug={slug}/>
    </div>
  )
}

export default page