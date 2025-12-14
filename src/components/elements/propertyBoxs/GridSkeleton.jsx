"use client"
import React from "react";
import ContentLoader from "react-content-loader";

export default function SkeletonPropertyCard() {
  const cards = Array.from({ length: 4 });
  return (
    <div className="d-flex flex-column gap-2">
      {cards?.map((_,index)=>{
        return (
          <div
          key={index}
      className="skeleton-card"
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: "300px",
      }}
    >
      {/* Left Image Section */}
      <div
        style={{
          flex: "1 1 45%",
          minWidth: "250px",
          maxWidth: "100%",
        }}
      >
        <ContentLoader
          speed={2}
          width="100%"
          height={250}
          backgroundColor="#e3e3e3"
          foregroundColor="#f5f5f5"
          style={{ borderRadius: "12px" }}
        >
          <rect x="0" y="0" width="100%" height="250" rx="12" />
        </ContentLoader>
      </div>

      {/* Right Details Section */}
      <div
        style={{
          flex: "1 1 55%",
          minWidth: "250px",
          maxWidth: "100%",
        }}
      >
        <ContentLoader
          speed={2}
          width="100%"
          height={260}
          backgroundColor="#e3e3e3"
          foregroundColor="#f5f5f5"
        >
          <rect x="0" y="0" width="120" height="14" rx="4" />
          <rect x="0" y="30" width="200" height="18" rx="4" />
          <rect x="0" y="65" width="120" height="18" rx="4" />
          <rect x="0" y="100" width="90%" height="12" rx="4" />
          <rect x="0" y="120" width="80%" height="12" rx="4" />
          <rect x="0" y="155" width="60%" height="14" rx="4" />
          <rect x="0" y="190" width="120" height="14" rx="4" />
          <rect x="75%" y="225" width="100" height="30" rx="20" />
        </ContentLoader>
      </div>

      {/* Responsive media query for mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .skeleton-card {
            flex-direction: column; /* stacked on mobile */
          }
        }
      `}</style>
    </div>
        )
      })}
    </div>
  );
}
