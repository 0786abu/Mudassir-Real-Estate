import Image from "next/image";
import React from "react";

const FloorPlanDeskBox = ({image}) => {
  return (
    <div className='desc-box' id='floor_plan'>
      <div className='page-section'>
        <h4 className='content-title'>Floor plan</h4>
        <Image src={image} alt='Floor Plan Image' height={400} width={500} className='img-fluid' style={{aspectRatio:"16/9",width:"100%", objectFit:"cover"}} />
      </div>
    </div>
  );
};

export default FloorPlanDeskBox;
