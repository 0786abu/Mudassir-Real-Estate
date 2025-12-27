import React from "react";
import ReactApexChart from "react-apexcharts";

const AvailableProperty = ({ loading, data, from }) => {

  // 🔒 SAFETY: data ready nahi to chart render hi nahi hoga
  if (loading || !data) {
    return (
      <div className="col-xl-4 xl-40 col-md-6">
        <div className="common-card available-property">
          <div className="common-header">
            <h5>Available property</h5>
          </div>
          <span>loading...</span>
        </div>
      </div>
    );
  }

  // ✅ Percent always number & 0–100 ke beech
  const percent = Math.min(
    100,
    Math.max(0, Number(data.availablePercent) || 0)
  );

  const chartData = {
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
            background: "#f2f2f2",
          },
          dataLabels: {
            name: {
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              fontSize: "40px",
              fontWeight: 400,
              label: `${percent}%`
            },
          },
        },
      },
      labels: ["Available"],
      colors: ["#108A00"],
      stroke: {
        lineCap: "round",
      },
    },
    series: [percent], // 👈 MUST be number
  };

  return (
    <div className={` ${from==="admin" ? "p-2 rounded-2 shadow-sm col-md-12 mt-4" : "col-xl-4 xl-40 col-md-6"}`}>
      <div className="common-card available-property">
        <div className="common-header">
          <h5>Available property</h5>
        </div>

        {/* INFO */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-1">
            <span style={{ fontWeight: "bold" }}>Total Properties:</span>
            <span>{data.totalProperties}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span style={{ fontWeight: "bold" }}>Approved Properties:</span>
            <span>{data.available}</span>
          </div>
        </div>

        {/* CHART */}
        <div className="radial-property">
          <ReactApexChart
          key={percent}
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableProperty;
