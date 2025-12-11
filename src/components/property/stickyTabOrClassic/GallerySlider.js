/**
 * It takes an array of images and returns a slider with the images
 * @returns The return statement is used to return a value from a function.
 */
import React, { useState } from "react";
import Slider from "react-slick";
import { galleryFor, galleryNav } from "../../../data/slickSlider";
import Img from "../../../utils/BackgroundImageRatio";

const GallerySlider = ({propertyImages}) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
    <div>
      <Slider className="gallery-for" {...galleryFor} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
        {propertyImages?.map((data, i) => (
          <div key={i}>
            <div>
              <Img src={data?.url} className="bg-img" />
            </div>
          </div>
        ))}
      </Slider>
      <Slider className="gallery-nav p-1" {...galleryNav} asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
          {propertyImages?.map((data, i) => (
          <div key={i} className="">
            <div>
              <Img className="img-fluid bg-img" src={data?.url} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GallerySlider;
