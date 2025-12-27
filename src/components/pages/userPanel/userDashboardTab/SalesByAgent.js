/* The above code is a React component that is using the dynamic import to load the react-apexcharts
library. */
import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesByAgent = ({loading,data,from}) => {
    const options = {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "40%",
        },
      },
      grid: {
        xaxis: {
          lines: {
            borderColor: "transparent",
            show: false,
          },
        },
        yaxis: {
          lines: {
            borderColor: "transparent",
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 1199,
          options: {
            chart: {
              height: 270,
            },
          },
        },
      ],
      colors: ["#108A00"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 1,
          type: "horizontal",
          gradientToColors: ["#108A00"],
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
  
      xaxis: {
        categories: data?.map((item)=>item.type),
        axisBorder: {
          low: 0,
          offsetX: 0,
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    }
    const series = [
      {
        name: "Num of properties in this type",
        data: data?.map((item)=>item.count),
      },
    ]
  return (
    <div className={` ${from==="admin" ? "shadow-sm p-2 rounded-2 col-md-12" : "col-xl-5 col-md-6"}`}>
      <div className='common-card sales-agent'>
        <div className='common-header'>
          <h5>Types of properties you create</h5>
        </div>
         {loading ? (
                  <span>loading</span>
                ) : (
                  <ReactApexChart options={options} series={series} type='bar' height={375} id='agent-sales' />
                )}
        
      </div>
    </div>
  );
};

export default SalesByAgent;
