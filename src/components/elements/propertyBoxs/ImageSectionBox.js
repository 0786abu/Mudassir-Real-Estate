// "use client";
// import Img from '@/utils/BackgroundImageRatio'
// import React from 'react'

// const ImageSectionBox = ({profile}) => {
//   return <Img src={profile?.url} className="bg-img" alt="" />
  
// }

// export default ImageSectionBox

// "use client";
import Image from "next/image";

const ImageSectionBox = ({ profile }) => {
  return (
    <div className="agent-img-wrapper">
      <Image
        src={profile?.url || "/images/placeholder.jpg"}
        alt="agent"
        fill
        className=" object-fit-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
    </div>
  );
};

export default ImageSectionBox;
