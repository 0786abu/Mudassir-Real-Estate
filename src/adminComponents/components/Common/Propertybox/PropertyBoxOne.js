import Link from "next/link";
import { Fragment, useState } from "react";
import Img from "../../utils/Img";
import SocialAccounts from "../SocialAccounts";

const PropertyBoxFour = ({ data, from }) => {
  const [show, setShow] = useState();
  return (
    <Fragment>
      <div className='property-box'>
        <div className='agent-image'>
          <div>
            <Img src={data?.profile ? data?.profile?.url : data?.agencyProfile?.url} className='bg-img' alt='' />
            <div className='agent-overlay'></div>
            <div className='overlay-content'>
              <SocialAccounts />
              <span>Connect</span>
            </div>
          </div>
        </div>
        <div className='agent-content'>
          <h3>
            <Link href='/pages/agency/agency-profile'>{data?.name}</Link>
          </h3>
          <p className='font-roboto'>Real estate Agent</p>
          <ul className='agent-contact'>
            {data.mobile ? (
              <li>
              <i className='fas fa-phone-alt'></i>
              <span className='character'>+91 {data?.phone === show ? data?.phone : data?.phone.slice(0, 5) + "*****"}</span>
              <span
                className='label label-light-danger'
                onClick={() => {
                  setShow(data?.phone);
                  data?.phone === show && setShow();
                }}
              >
                {show === data?.phone ? "hide" : "show"}
              </span>
            </li>
            ):(<li>
              <span>no phone number yet</span>
            </li>)}
            <li>
              <i className='fas fa-envelope'></i> {data?.email}
            </li>
          </ul>
          <Link href={from && from==="agent" ? `/admin/dashboard/allAgents/${data._id}` : `/admin/dashboard/allUsers/${data._id}`}>
            View profile <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default PropertyBoxFour;
