import React from "react";
import Img from "@/utils/BackgroundImageRatio";
import { formatDatenew } from "../payments";
import { Button } from "reactstrap";
import Link from "next/link";

const PropertyOverview = ({latestProperties,setActiveTab}) => {
  return (
    <div className='col-xl-8 xl-60 col-md-12'>
      <div className='common-card property-overview'>
        <div className='common-header'>
          <h5>Latest Properties</h5>
        </div>
        <div className='table-responsive'>
          <table className='table table-bordernone'>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>View Property</th>
              </tr>
            </thead>
            <tbody>
              {latestProperties?.length===0 ? (
                <tr><td className=" border-0 my-4" colSpan={5}>No Properties yet</td></tr>
              ) : (
                latestProperties?.map((property)=>{
                return (
                  <tr key={property._id}>
                <td>
                  <div className='d-flex'>
                    <Img src={property.images[0].url} className={property.title} alt='' />
                    <h6>{property.category}</h6>
                  </div>
                </td>
                <td>{property.type}</td>
                <td>{formatDatenew(property.createdAt)}</td>
                <td>
                  <span className='label label-light label-success'>{property.isPaid ? "Paid" : "unPaid"}</span>
                </td>
                <td>
                  <Link href={`/properties/${property.slug}`} target="_blank"><Button size="sm" style={{background:"#FD735C",color:"white"}}>View</Button></Link>
                </td>
              </tr>
                )
              })
              )}
            </tbody>
          </table>
        </div>
              <div className=" d-flex justify-content-center mt-4 align-items-center">
            <Button onClick={()=>setActiveTab("Listing")} style={{background:"#FD735C"}}>See all Properties</Button>
              </div>
          
      </div>
    </div>
  );
};

export default PropertyOverview;
