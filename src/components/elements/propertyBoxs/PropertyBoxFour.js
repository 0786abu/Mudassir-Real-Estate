/**
 * It's a function that returns a div with a bunch of other divs and spans inside it
 * @returns A React component
 */
import Link from "next/link";
import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import Img from "../../../utils/BackgroundImageRatio";
import SocialAccounts from "../SocialAccounts";

const PropertyBoxFour = ({ data }) => {
  const [load, setLoad] = useState(true);
  const [show, setShow] = useState();
  const phoneStr = data?.phone?.toString();

  return (
    <>
      {!load ? (
        <div className="property-box">
          <div className="agent-image">
            <div>
              <Img src={data?.agencyProfile?.url} className="bg-img" alt="" />
              <span className="label label-shadow">{data?.numOfProperties} properties</span>
              <div className="agent-overlay"></div>
              <div className="overlay-content">
                <SocialAccounts />
                <span>Connect</span>
              </div>
            </div>
          </div>
          <div className="agent-content">
            <h3 
            style={{
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1, // Number of lines
  }}>
              <Link href={`/agents/${data?._id}`}>{data?.agencyName ? data?.agencyName : data?.name}</Link>
            </h3>
            <p className="font-roboto">Real estate Agent</p>
            <ul className="agent-contact">
                {data?.phone && (
              <li>
                <i className="fas fa-phone-alt"></i>
                  <span className="character">+92 {data?.phone == show ? phoneStr : phoneStr.slice(0, 5) + "*****"}</span>
                <span
                  className="label label-light label-flat"
                  onClick={() => {
                    setShow(data?.phone);
                    data?.phone == show && setShow();
                  }}>
                  {show === data?.phone ? "Hide" : "Show"}
                </span>
              </li>
                  )}
              <li>
                <i className="fas fa-envelope"></i> {data?.email}
              </li>
            </ul>
            <Link href={`/agents/${data?._id}`}>
              View profile <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      ) : (
        <ContentLoader className="skeleton-svg">
          {setTimeout(() => {
            setLoad(false);
          }, 2000)}
          <rect className="skeleton-img" />
          <rect className="skeleton-c1" />
          <rect className="skeleton-c2" />
          <rect className="skeleton-c3" />
        </ContentLoader>
      )}
    </>
  );
};

export default PropertyBoxFour;
