import React, { Fragment } from "react";

const PropertyLabel = ({ labels }) => {
  return (
    <>
              <div>
                <span className='label label-success'>{labels}</span>
              </div>
    </>
  );
};

export default PropertyLabel;
