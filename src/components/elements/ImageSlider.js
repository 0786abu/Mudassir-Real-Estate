import React from "react";
import Slider from "react-slick";
import Img from "../../utils/BackgroundImageRatio";
// import dynamic from "next/dynamic";

// const Slider = dynamic(() => import("react-slick"), { ssr: false });


const ImageSlider = ({ images }) => {
  const propertySlider = {
    dots: true,
    infinite: images?.length>1 ? true : false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
      <Slider className="property-slider" {...propertySlider}>
        {images?.map((data, i) => (
          <div key={i}>
            <div>
              <Img src={data.url} className="bg-img" />
            </div>
          </div>
        ))}
      </Slider>
  );
};

export default ImageSlider;
