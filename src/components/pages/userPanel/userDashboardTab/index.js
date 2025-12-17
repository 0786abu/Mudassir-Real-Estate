import React from "react";
import { Row } from "reactstrap";
import AvailableProperty from "./AvailableProperty";
import PropertyOverview from "./PropertyOverview";
import SalesByAgent from "./SalesByAgent";
import SalesOverview from "./SalesOverview";
import SmallBarCard from "./SmallBarCard";

const UserDashboardTab = ({loading,data,typedData,availableData}) => {
  return (
    <div className="dashboard-content">
      <div id="dashboard">
        <div className="user-wrapper">
            {loading ? (
              <div className=" d-flex justify-content-center align-items-center" style={{height:"30vh"}}>
                <span>Please wait...</span>
              </div>
            ) : (
              <Row>
              <SmallBarCard />
            <SalesOverview loading={loading} data={data} />
            <SalesByAgent loading={loading} data={typedData} />
            <AvailableProperty loading={loading} data={availableData} />
            <PropertyOverview />
          </Row>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTab;
