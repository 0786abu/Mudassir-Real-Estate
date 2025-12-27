"use client"
import MyListingTab from '@/components/pages/userPanel/myListingTab'

const page = () => {
  return (
    <div>
        <MyListingTab from="admin" fromTo="myListing"/>
    </div>
  )
}

export default page