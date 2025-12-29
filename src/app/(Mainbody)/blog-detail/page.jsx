"use client";
import { Fragment } from "react";
import BodyContent from "@/components/pages/blogDetailPages";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";
import Img from "@/utils/BackgroundImageRatio";

const RightSidebar = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent side={"right"}>
        <div className="blog-detail-image">
          <Img src="/assets/images/parallax/4.jpg" className="bg-img img-fluid" alt="" />
        </div>
      </BodyContent>
    </Fragment>
  );
};
export default RightSidebar;
