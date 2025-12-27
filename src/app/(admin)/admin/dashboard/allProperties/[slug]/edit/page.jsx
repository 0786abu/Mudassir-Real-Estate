import EditProperty from '@/components/pages/userPanel/EditProperty'
import React from 'react'

const page = async({params}) => {
    const {slug} = await params;
  return (
    <div>
        <EditProperty adminSlug={slug} from="admin"/>
    </div>
  )
}

export default page