import React from "react";
import { TrendingUp } from "react-feather";
import { Card, CardBody, Col, Row } from "reactstrap";
// import { chartoptions, chartseries } from "../../data/dashboard/data";
import ReactApexChart from "react-apexcharts";
// import { formatKK } from "@/utils/Formatter";

const SalaryChart = ({data}) => {
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
        data: data?.map((item)=>item.total),
      },
    ]
  return (
    <Col xl='8 large-12'>
      <Card className='sales-details'>
        <CardBody>
          <Row>
            {/* <Col sm='4'>
              <div className='sales-status'>
                <h5 className='light-font'>Sales summary</h5>
                <div className='status-price'>
                  <h3>$16,230/-</h3>
                  <span>
                    last week
                    <span className='font-success'>
                      + 10%
                      <TrendingUp />
                    </span>
                  </span>
                </div>
              </div>
              <div className='chart-legends'>
                <ul>
                  <li>
                    <div className='bg-primary circle-label' />
                    <span>Last week</span>
                  </li>
                  <li className='mt-1'>
                    <div className='bg-secondary circle-label' />
                    <span>Running week</span>
                  </li>
                </ul>
              </div>
              <div className='last-updated light-box'>
                <span>Last updated</span>
                <h5>Dec 26, 2022</h5>
              </div>
            </Col> */}
            <Col sm='12'>
              <div className='monthly-sales'>
                <h4>Properties types data</h4>
              </div>
              <div className='bar-sales'>
                <div id='sale-chart'>
                  <ReactApexChart options={options} series={series} type='bar' height={400} id='agent-sales' />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalaryChart;
