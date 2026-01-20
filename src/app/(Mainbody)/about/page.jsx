import React, { Fragment } from "react";
import BreadCrumb2 from "@/layout/Breadcrumb/BreadCrumb2";
import BodyContent from "@/components/pages/other-pages/aboutUs2";


export const metadata = {
  title: "About Us | Leading Real Estate Company in Pakistan",
  description:
    "Learn about our real estate company in Pakistan – delivering premium residential and commercial projects across Karachi, Lahore, Islamabad, and other cities. Discover our vision, mission, and commitment to quality construction and client satisfaction.",
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
    title: "About Us | Leading Real Estate Company in Pakistan",
    description:
      "Discover our vision, mission, and premium real estate projects across Pakistan. Learn why we are a trusted real estate developer.",
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