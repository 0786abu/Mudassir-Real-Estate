/**
 * It returns a div with a class of advance-card, which contains a h6 with the text "Contact Info",
 * which contains a div with a class of category-property, which contains a div with a class of
 * agent-info, which contains a div with a class of media, which contains an img with a class of
 * img-50, which contains a div with a class of media-body ms-2, which contains a h6 with the text
 * "Jonathan Scott", which contains a p with the text "Contact@gmail.com", which contains a ul, which
 * contains two li's, which contain an i with a class of me-2, which contains the text "A-32, Albany,
 * Newyork." and "(+066) 518 - 457 - 5181"
 * @returns A div with a class of advance-card.
 */
import React from "react";
import { MapPin, PhoneCall } from "react-feather";

const ContactInfo = ({owner}) => {
  return (
    <div className='advance-card'>
      <h6>Owner Info</h6>
      <div className='category-property'>
        <div className='agent-info'>
          <div className='media'>
            <img src={owner?.agencyProfile?.url || owner?.profile?.url || "/assets/images/profile.webp"} className='img-50' style={{borderRadius:"50%",objectFit:"cover"}} alt='' />
            <div className='media-body ms-2'>
              <h6>{owner?.name || owner?.agencyName}</h6>
              <p>{owner?.email}</p>
            </div>
          </div>
        </div>
        <ul>
          <li>
            <MapPin className='me-2' />
            {owner?.address}
          </li>
          {owner?.phone && (
            <li>
            <PhoneCall className='me-2' />
            {owner?.phone}
          </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
