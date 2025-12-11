import React from "react";

const FeatureDeskBox = ({Amenities}) => {
  return (
    <div className='desc-box' id='amenities'>
      <div className='page-section feature-dec'>
        <h4 className='content-title'>Amenities</h4>
            <ul className=" d-flex flex-wrap gap-2">
             {Amenities?.map((amenity,index)=>{
              return  <li key={index}>
                <span className="btn btn-dashed btn-pill">{amenity}</span>
              </li>
             })}
            </ul>
      </div>
    </div>
  );
};

export default FeatureDeskBox;
