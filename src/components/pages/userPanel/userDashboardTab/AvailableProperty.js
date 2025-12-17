import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const AvailableProperty = ({loading,data}) => {
  const [percent, setPercent] = useState(0)

  const availablePropertyData = {
  options: {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          show: true,
          background: "#f2f2f2",
          strokeWidth: "20%",
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {},
          value: {
            show: false,
          },
          total: {
            show: true,
            fontSize: "40px",
            fontWeight: 400,
            label: `${percent}%`,
          },
        },
      },
    },

    labels: ["property"],
    colors: ["#ff5c41"],
    stroke: {
      lineCap: "round",
    },
  },
  series: [percent],
}
useEffect(()=>{
  if(data){
    setPercent(data?.availablePercent)
  }
},[data?.availablePercent,data])
  return (
    <div className='col-xl-4 xl-40 col-md-6'>
      <div className='common-card available-property'>
        <div className='common-header'>
          <h5>Available property</h5>
        </div>
        <div className=" mb-4">
          <div className=" d-flex  align-items-center gap-1">
            <span style={{fontWeight:"bold"}}>Total Properties :</span>
            <span>{data?.totalProperties}</span>
          </div>
          <div className=" d-flex  align-items-center gap-1">
            <span style={{fontWeight:"bold"}}>Approved Properties :</span>
            <span>{data?.available}</span>
          </div>
        </div>
        {loading ? (<span>loading</span>) : (
          <div className='radial-property'>
          <div id='radial'>
            <ReactApexChart options={availablePropertyData.options} series={availablePropertyData.series} type='radialBar' id='radial' height={300} />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AvailableProperty;
