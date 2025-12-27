import { Col, Row } from "reactstrap";
import PropertyBox from "../../Common/Propertybox/PropertyBox";
import ProfileLoader from "@/components/common/Loader";

const FavouriteProperties = ({properties,favloading}) => {
  

  return (
    <Col xl='12'>
      {favloading ? <ProfileLoader/> : properties?.length===0 ? (
        <div className=" d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
          <h2>No Favourite Properties yet</h2>
        </div>
      ) : (
        <Row className='property-2 column-sm property-label property-grid'>
        {properties &&
          properties.slice(0, 6).map((item, index) => {
            return (
              <Col key={index} xl='4' md='6 xl-6'>
                <PropertyBox data={item} />
              </Col>
            );
          })}
      </Row>
      )}
    </Col>
  );
};

export default FavouriteProperties;
