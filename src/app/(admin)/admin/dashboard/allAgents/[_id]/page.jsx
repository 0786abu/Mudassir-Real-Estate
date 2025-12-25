import React from 'react'
import Profile from './ProfileData';

const page = async({params}) => {
    const {_id} = await params;
  return (
    <div>
        <Profile _id={_id}/>
    </div>
  )
}

export default page