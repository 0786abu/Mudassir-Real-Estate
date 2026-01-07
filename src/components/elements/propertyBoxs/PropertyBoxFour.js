/**
 * It's a function that returns a div with a bunch of other divs and spans inside it
 * @returns A React component
 */
import Link from "next/link";
import SocialAccounts from "../SocialAccounts";
import SetShowPhone from "./SetShowPhone";
import ImageSectionBox from "./ImageSectionBox";

const PropertyBoxFour = ({ data }) => {
  const phoneStr = data?.phone?.toString();

  return (
    <>
        <div className="property-box">
          <div className="agent-image">
            <div>
              <ImageSectionBox profile={data?.agencyProfile}/>
              <span style={{background:"#14a800"}} className="label">{data?.numOfProperties} properties</span>
              <div className="agent-overlay"></div>
              <div className="overlay-content">
                {!data?.socialMedia ? (
                  <h4 className="text-white">No social network</h4>
                ) : (
                  <div>
                  <SocialAccounts socialMedia={data?.socialMedia} />
                <span>Connect</span>
                  </div>
                )}
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
              <SetShowPhone phone={phoneStr}/>
                  )}
              <li>
                <i className="fas fa-envelope"></i> {data?.email}
              </li>
            </ul>
            <Link href={`/agents/${data?._id}`} style={{color:"#14a800"}}>
              View profile <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
    </>
  );
};

export default PropertyBoxFour;
