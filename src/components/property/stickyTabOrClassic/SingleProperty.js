import React from "react";
import { Col } from "reactstrap";
import useStickyBar from "../../../utils/useStickyBar";
import useActiveLinkInStickyBar from "../../../utils/useActiveLinkInStickyBar";
import DetailsDeskBox from "./DetailsDeskBox";
import FeatureDeskBox from "./FeatureDeskBox";
import FloorPlanDeskBox from "./FloorPlanDeskBox";
import GalleryDeskBox from "./GalleryDeskBox";
// import LocationMapDeskBox from "./LocationMapDeskBox";
import SearchBarDeskBox from "./SearchBarDeskBox";
import VideoDeskBox from "./VideoDeskBox";
// import ReviewsDeskBox from "./ReviewsDeskBox";

const SinglePropertySection = ({property}) => {
  const fix = useStickyBar();
  useActiveLinkInStickyBar();
  return (
    <Col xl='9' lg='8'>
      <div className='description-section'>
        <div className='description-details'>
          <GalleryDeskBox propertyImages={property?.images} />
          <SearchBarDeskBox video={property?.video} floorPlanImage={property?.floorPlanImage} aboutProperty={property?.aboutProperty} />
          <FeatureDeskBox Amenities={property?.amenities} />
          {property?.video && <VideoDeskBox video={property?.video} />}
          <DetailsDeskBox property={property} />
          {property?.floorPlanImage && (
            <FloorPlanDeskBox image={property?.floorPlanImage?.url} />
          )}
          {/* <LocationMapDeskBox /> */}
          {/* <ReviewsDeskBox /> */}
        </div>
      </div>
    </Col>
  );
};

export default SinglePropertySection;
