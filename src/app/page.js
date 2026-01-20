import BodyContent from "@/components/home/search-tab";
import { Fragment } from "react";

export const metadata = {
  title: "Pak Earth | Pakistan’s Trusted Real Estate & Property Portal",
  description:
    "Pak Earth is Pakistan’s trusted real estate platform to buy, sell, and invest in properties and projects across Karachi, Lahore, Islamabad, and major cities. Explore residential, commercial, and investment opportunities with verified listings.",
  keywords: [
    "Pak Earth",
    "Real estate Pakistan",
    "Property portal Pakistan",
    "Buy property in Pakistan",
    "Sell property Pakistan",
    "Pakistan real estate projects",
    "Residential properties Pakistan",
    "Commercial real estate Pakistan",
    "Karachi real estate",
    "Lahore property",
    "Islamabad real estate",
    "Property investment Pakistan",
    "Housing projects Pakistan",
    "Plots and houses Pakistan"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pak Earth | Pakistan’s Leading Real Estate & Property Platform",
    description:
      "Discover verified properties and real estate projects across Pakistan with Pak Earth. Buy, sell, or invest in residential and commercial properties nationwide.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/about.webp`,
        width: 1200,
        height: 630,
        alt: "Pak Earth Real Estate Pakistan",
      },
    ],
    type: "website",
  }
};


const SearchTab = async() => {
   
  return (
    <Fragment>
      <BodyContent />
    </Fragment>
  );
};

export default SearchTab;
