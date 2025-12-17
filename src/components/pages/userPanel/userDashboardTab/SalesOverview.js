import { formatKK, formatPK } from "@/utils/Formatter";
import React from "react";
// import { overviewChartData } from "@/data/chartData";
import ReactApexChart from "react-apexcharts";

const SalesOverview = ({loading,data}) => {
   const options = {
      chart: {
        type: "area",
        dropShadow: {
          enabled: true,
          top: 10,
          left: 0,
          blur: 3,
          color: "#720f1e",
          opacity: 0.15,
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      markers: {
        strokeWidth: 4,
        strokeColors: "#ffffff",
        hover: {
          size: 9,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        lineCap: "butt",
        width: 4,
      },
      legend: {
        show: false,
      },
      colors: ["#ff5c41"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.4,
          stops: [0, 90, 100],
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
        padding: {
          right: 0,
          bottom: 0,
          left: 15,
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            grid: {
              padding: {
                right: 0,
              },
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            grid: {
              padding: {
                right: 0,
              },
            },
          },
        },
      ],
      yaxis: {
        labels: {
          formatter: function (value) {
            return formatKK(value);
          },
        },
        axisBorder: {
          low: 0,
          offsetX: 0,
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
      },
      xaxis: {
        categories: data?.data?.map((item)=>item.month),
        range: undefined,
        
        axisBorder: {
          low: 0,
          offsetX: 0,
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          position: "back",
          stroke: {
            color: "#ff5c41",
            width: 1,
            dashArray: 0,
          },
        },
      },
      tooltip: {
        formatter: undefined,
      },
    }
    const series = [
      {
        name: "Views of this month",
        data: data.data?.map((item)=>item.views) || [],
      },
    ]
  return (
    <div className='col-xl-7 col-md-12'>
      <div className='common-card overview'>
        <div className='common-header'>
          <h5>View overview</h5>
        </div>
        {/* <ul className='overview-content'>
          <li>
            <div className='d-flex'>
              <div>
                <p>Earned today</p>
                <h4>$31415</h4>
              </div>
              <span>
                <span className='label label-success'>+30%</span>
              </span>
            </div>
          </li>
          <li>
            <div className='d-flex'>
              <div>
                <p>Earned weekly</p>
                <h4>$78812</h4>
              </div>
              <span>
                <span className='label label-success'>+20%</span>
              </span>
            </div>
          </li>
          <li>
            <div className='d-flex'>
              <div>
                <p>Earned monthly</p>
                <h4>$67810</h4>
              </div>
              <span>
                <span className='label label-danger'>-10%</span>
              </span>
            </div>
          </li>
        </ul> */}
        {loading ? (
          <span>loading</span>
        ) : (
          <ReactApexChart options={options} series={series} id='overviewchart' type='area' height={350} />
        )}
        {/* <div id='overviewchart'></div> */}
      </div>
    </div>
  );
};

export default SalesOverview;
