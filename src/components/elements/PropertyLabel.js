import React, { Fragment } from "react";

const PropertyLabel = ({ labels,color }) => {
  return (
    <>
              <div>
                <span className={`label label-${color ? color : "success"}`}>{labels}</span>
              </div>
    </>
  );
};

export default PropertyLabel;
