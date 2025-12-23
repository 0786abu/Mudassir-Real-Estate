import React from "react";
import { Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { Erningseries, ErningsOption } from "@/adminComponents/data/manage-profile/profiledata";

const RecentChart = () => {
  return (
    <Card className='earning-chart'>
      <CardBody>
        <div className='title-about'>
          <h5>Recent earnings</h5>
        </div>
        <ReactApexChart options={ErningsOption} series={Erningseries} type='bar' height={150} />
      </CardBody>
    </Card>
  );
};

export default RecentChart;
