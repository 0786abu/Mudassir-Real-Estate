import React from "react";
import ContentLoader from "react-content-loader";

export default function SkeletonPropertyCard() {
  return (
    <div
      className="property-box"
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "20px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: "300px",
      }}
    >
      {/* Left Image Section */}
      <div style={{ width: "45%", marginRight: "20px" }}>
        <ContentLoader
          speed={2}
          width={"100%"}
          height={250}
          backgroundColor="#e3e3e3"
          foregroundColor="#f5f5f5"
          style={{ borderRadius: "12px" }}
        >
          {/* Full image */}
          <rect x="0" y="0" width="100%" height="250" rx="12" />
        </ContentLoader>
      </div>

      {/* Right Details Section */}
      <div style={{ width: "55%" }}>
        <ContentLoader
          speed={2}
          width={"100%"}
          height={260}
          backgroundColor="#e3e3e3"
          foregroundColor="#f5f5f5"
        >
          {/* Country */}
          <rect x="0" y="0" width="120" height="14" rx="4" />

          {/* Title */}
          <rect x="0" y="30" width="200" height="18" rx="4" />

          {/* Price */}
          <rect x="0" y="65" width="120" height="18" rx="4" />

          {/* Paragraph 2 lines */}
          <rect x="0" y="100" width="90%" height="12" rx="4" />
          <rect x="0" y="120" width="80%" height="12" rx="4" />

          {/* Bed / Bath / SqFt */}
          <rect x="0" y="155" width="60%" height="14" rx="4" />

          {/* Date */}
          <rect x="0" y="190" width="120" height="14" rx="4" />

          {/* Details Button */}
          <rect x="75%" y="225" width="100" height="30" rx="20" />
        </ContentLoader>
      </div>
    </div>
  );
}
