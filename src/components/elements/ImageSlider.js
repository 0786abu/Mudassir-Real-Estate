import React from "react";
import Slider from "react-slick";
import { propertySlider } from "../../data/slickSlider";
import Img from "../../utils/BackgroundImageRatio";

const ImageSlider = ({ images }) => {
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
