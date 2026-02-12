/**
 * It returns a Col component with a className of either 'order-1' or an empty string, depending on the
 * value of the side prop
 * @param props - This is the props object that is passed to the component.
 * @returns A Col component with a div inside of it.
 */
import React from "react";
import { Col } from "reactstrap";

const Sidebar = (props) => {
  return (
    <Col xl='3' lg='4' className={`${props.side === "right" ? " order-1" : "mb-4"} sidebarnone`} style={{marginTop:props.top ? props.top : undefined}}>
      <div className={`${!props.singleProperty && "left-sidebar"}  blog-sidebar sticky-cls`} style={{width:"100%"}}>
        <div className='filter-cards'>
          {props.children}
        </div>
      </div>
    </Col>
  );
};

export default Sidebar;
