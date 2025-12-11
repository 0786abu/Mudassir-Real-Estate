import React from "react";

const FloorPlanDeskBox = ({image}) => {
  return (
    <div className='desc-box' id='floor_plan'>
      <div className='page-section'>
        <h4 className='content-title'>Floor plan</h4>
        <img src={image} alt='' className='img-fluid' style={{aspectRatio:"16/9", objectFit:"cover"}} />
      </div>
    </div>
  );
};

export default FloorPlanDeskBox;
