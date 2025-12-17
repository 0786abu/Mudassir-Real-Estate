import React, { Fragment } from "react";
import { Col } from "reactstrap";
import { smallChartData1 } from "@/data/chartData";
import ReactApexChart from "react-apexcharts";
import { formatKK } from "@/utils/Formatter";

const SmallBarCard = ({viewsData,availableProperties}) => {
  const totalViews = viewsData?.data?.reduce((sum, item) => {
  return sum + (item.views || 0);
}, 0);
  return (
    <Fragment>
      <Col md='4'>
        <div className='common-card'>
          <div className='widgets'>
            <div className='media'>
              <div className='media-body'>
                <p>Total Properties</p>
                <h5>{availableProperties?.totalProperties}</h5>
              </div>
              {/* <div className='small-bar'>
                <ReactApexChart options={{ ...smallChartData1.options, colors: [`var(--theme-default)`] }} series={smallChartData1.series} type='bar' className='small-chart' />
              </div> */}
            </div>
          </div>
        </div>
      </Col>
      <div className='col-md-4'>
        <div className='common-card'>
          <div className='widgets widget-1'>
            <div className='media'>
              <div className='media-body'>
                <p>Approved Properties</p>
                <h5>{availableProperties?.available}</h5>
              </div>
              {/* <div className='small-bar'>
                <ReactApexChart options={{ ...smallChartData1.options, colors: [`var(--theme-default2)`] }} series={smallChartData1.series} type='bar' className='small-chart' />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='common-card'>
          <div className='widgets widget-2'>
            <div className='media'>
              <div className='media-body'>
                <p>Total Views of this Year</p>
                <h5>{formatKK(totalViews)}+</h5>
              </div>
              {/* <div className='small-bar'>
                <ReactApexChart options={{ ...smallChartData1.options, colors: [`var(--theme-default)`] }} series={smallChartData1.series} type='bar' className='small-chart' />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmallBarCard;
