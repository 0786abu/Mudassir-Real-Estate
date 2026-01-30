/**
 * It renders a skeleton loader for 3 seconds and then renders the actual content
 * @returns A React component.
 */
import Link from "next/link";
import Img from "@/utils/BackgroundImageRatio";
import { formatPK } from "@/utils/Formatter";

const PropertyBoxOne = ({ data }) => {
  return (
    <div className="property-card">
      <div className="image-wrapper">
        <Img src={data?.images[0]?.url} className="bg-img" />

        <span className="tag">{data?.type}</span>

        <div className="price-badge">
         PKR {formatPK(data?.price)}
        </div>
      </div>

      <div className="card-body">
        <h4>
          <Link href={`/properties/${data.slug}`}>
            {data?.title}
          </Link>
        </h4>

        <p className="location">
          {data?.city}, {data?.location}
        </p>

        <div className="features">
          {data?.beds > 0 && <span>🛏 {data.beds}</span>}
          {data?.baths > 0 && <span>🛁 {data.baths}</span>}
          {data?.rooms > 0 && <span>🚪 {data.rooms}</span>}
          {data?.squareFits && <span>📐 {data.squareFits} sqft</span>}
        </div>

        <Link href={`/properties/${data.slug}`} className="details-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PropertyBoxOne;
