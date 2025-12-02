/**
 * It takes in a list of properties and returns a list of property boxes
 * @returns A div with a className of property-2 row column-sm zoom-gallery property-label
 * property-grid.
 */
import React, { Fragment, useEffect } from "react";
import { Col, Row } from "reactstrap";
import useFilterProducts from "../../../utils/useFilterProducts";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";

const GridLayout = ({ value, grid, relativeSlider, video, infiniteScroll, myList, gridDispatch }) => {
  let cardToShow = 6;
  const showProduct = useFilterProducts({ value, myList });

  useEffect(() => {
    gridDispatch({ type: "totalPages", payload: Math.ceil(showProduct?.length / cardToShow) });
    gridDispatch({ type: "productCount", payload: showProduct?.length });
  }, [showProduct, cardToShow]);

  return (
    <Fragment>
      <Row className={`property-2 column-sm zoom-gallery property-label property-grid list-view`}>
        {showProduct &&
          showProduct.slice(!infiniteScroll && cardToShow * grid.toPage - cardToShow, cardToShow * grid.toPage).map((data, i) => (
            <Fragment key={i}>
              <Col className={`list-view wow fadeInUp `} key={i}>
                <PropertyBox data={data} relativeSlider={relativeSlider} video={video} />
              </Col>
            </Fragment>
          ))}
      </Row>
    </Fragment>
  );
};

export default GridLayout;
