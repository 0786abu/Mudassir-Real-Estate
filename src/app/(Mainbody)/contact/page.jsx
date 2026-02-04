import React, { Fragment } from "react";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import BodyContent from "@/components/contact/contactUs2";

export const metadata = {
  title: "Contact Us | www.PakEarth.com | Real Estate Support & Inquiries",
  description:
    "Get in touch with our real estate team in Pakistan. Contact us for property inquiries, project details, investment opportunities or general assistance. Available across Karachi, Lahore, Islamabad and other cities.",
  keywords: [
    "Contact real estate Pakistan",
    "Property inquiries Pakistan",
    "Real estate support",
    "Reach real estate agents",
    "Real estate assistance Pakistan"
  ].join(", "),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Us | www.PakEarth.com | Real Estate Support & Inquiries",
    description: "Need help with Property Ad posting or investments? Get in touch with PakEarth Team for property inquiries, project info across Pakistan’s major cities.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/contact-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Contact Real Estate Company",
      },
    ],
    type: "website",
  }
};



const ContactUs1 = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <BodyContent />
    </Fragment>
  );
};

export default ContactUs1;
