/**
 * It renders a slider with a background image and a title
 * @returns The return statement is used to return a value from a function.
 */
import React from "react";
import Slider from "react-slick";
import { mainPropertySlider } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import NoSsr from "@/utils/NoSsr";
import TopTitle from "./TopTitle";

const SliderBreadcrumbSection = ({property,favourites}) => {
  // const breadcrumbBg = ["/assets/images/property-detail-1.webp","/assets/images/property-detail-2.webp","/assets/images/property-detail-3.webp"];
  return (
    <section className="ratio_40 breadcrumb-section p-0 single-property-images">
      <NoSsr>
        <Slider className="main-property-slider arrow-image" {...mainPropertySlider}>
          {property?.images?.map((item, index) => (
            <div key={index}>
              <div>
                <Img src={item.url} className="bg-img" alt="" />
              </div>
            </div>
          ))}
        </Slider>
      </NoSsr>
      <TopTitle property={property} favourites={favourites} />
    </section>
  );
};

export default SliderBreadcrumbSection;
