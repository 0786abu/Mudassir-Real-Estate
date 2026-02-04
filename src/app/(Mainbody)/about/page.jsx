import React, { Fragment } from "react";
import BreadCrumb2 from "@/layout/Breadcrumb/BreadCrumb2";
import BodyContent from "@/components/pages/other-pages/aboutUs2";


export const metadata = {
  title: "About | PakEarth – Pakistan Real Estate Ads & Property Listings",
  description:
    "PakEarth is a Pakistan-based Real Estate platform where users can post property ads and explore houses, plots and commercial Real Estate nationwide.",
  keywords: [
    "Real estate company Pakistan",
    "About real estate developers",
    "Residential and commercial projects",
    "Property developers Karachi Lahore Islamabad",
    "Trusted real estate company Pakistan"
  ].join(", "),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: " About | PakEarth – Pakistan Real Estate Ads & Property Listings ",
    description:
      "Explore our vision and mission while discovering premium trusted Real Estate Projects across Pakistan, backed by trust, quality and long-term value.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/about-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "About Our Real Estate Company",
      },
    ],
    type: "website",
  }
};


const AboutUs2 = () => {
  return (
    <Fragment>
      <BreadCrumb2 />
      <BodyContent />
    </Fragment>
  );
};

export default AboutUs2;