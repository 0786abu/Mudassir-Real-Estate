import PropertyBox from "@/components/elements/propertyBoxs/PropertyBox";
import { Col, Row } from "reactstrap";



const Listview = ({data,from}) => {
  return (
    <div className='col-xl-12'>
      <Row className='column-sm zoom-gallery property-grid'>
        {data &&
          data.map((item, i) => {
            return (
              <Col xl='4' sm='6' key={i}>
                <PropertyBox data={item} from={from}/>
              </Col>
            );
          })}
      </Row>
      {/* <Pagination /> */}
    </div>
  );
};

export default Listview;
