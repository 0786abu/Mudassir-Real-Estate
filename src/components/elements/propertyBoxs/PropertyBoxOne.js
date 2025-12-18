/**
 * It renders a skeleton loader for 3 seconds and then renders the actual content
 * @returns A React component.
 */
import Link from "next/link";
import React from "react";
import { Button } from "reactstrap";
import ContentLoader from "react-content-loader";
import Img from "@/utils/BackgroundImageRatio";
import PropertyLabel from "../PropertyLabel";
import { formatPK } from "@/utils/Formatter";

const PropertyBoxOne = ({ data }) => {
  return (
    <>
        <div className="property-box">
          <div className="property-image">
            <a>
              <Img src={data?.images[0].url} className="bg-img" />
              <div className="labels-left">
                <PropertyLabel labels={data?.label} />
              </div>
            </a>
            <div className="bottom-property">
              <div className="d-flex">
                <div>
                  <h5>
                    <Link href={`/properties/${data.slug}`}>{data?.title}</Link>
                  </h5>
                  <h6>
                    {formatPK(data.price)} <small>/ start from</small>
                  </h6>
                </div>
                <Link href={`/properties/${data.slug}`}>
                  <Button className=" btn-gradient mt-3">Details</Button>
                </Link>
              </div>
              <div className="overlay-option">
                <ul>
                  {data.beds>0 ? (
                    <li>
                    <span>Beds</span>
                    <h6>{data?.beds}</h6>
                  </li>
                  ):(
                    <li>
                    <span>SQFT</span>
                    <h6>{data?.squareFits}</h6>
                  </li>
                  )}
                  {data.baths>0 && (
                    <li>
                    <span>Baths</span>
                    <h6>{data?.baths}</h6>
                  </li>
                  )}
                  {data.rooms>0 && (
                    <li>
                    <span>Rooms</span>
                    <h6>{data?.rooms}</h6>
                  </li>
                  )}
                  <li>
                    <h6>
                      {data?.areaSize}
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default PropertyBoxOne;
