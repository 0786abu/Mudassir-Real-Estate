import React, { useEffect } from "react";
import { Row } from "reactstrap";
import AvailableProperty from "./AvailableProperty";
import PropertyOverview from "./PropertyOverview";
import SalesByAgent from "./SalesByAgent";
import SalesOverview from "./SalesOverview";
import SmallBarCard from "./SmallBarCard";
import ProfileLoader from "@/components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ViewsChartData } from "@/redux-toolkit/action/propertyAction";

const UserDashboardTab = ({setActiveTab}) => {
  const {myViewsChartData,viewsdataloading,myTypeChartData,myAvailableProeprtiesChartData} = useSelector((state)=>state.Property);
  const {latestProperties} = useSelector((state)=>state.Agent);
  const dispatch = useDispatch();
    useEffect(()=>{
    dispatch(ViewsChartData());
  },[dispatch])
  return (
    <div className="dashboard-content">
      <div id="dashboard">
        <div className="user-wrapper">
            {viewsdataloading ? (
              <ProfileLoader/>
            ) : (
              <Row>
              <SmallBarCard />
            <SalesOverview data={myViewsChartData} />
            <SalesByAgent data={myTypeChartData} />
            <AvailableProperty data={myAvailableProeprtiesChartData} />
            <PropertyOverview latestProperties={latestProperties} setActiveTab={setActiveTab} />
          </Row>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTab;
