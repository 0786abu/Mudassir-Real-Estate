import BodyContent from "@/components/home/search-tab";
import { Fragment } from "react";

export const metadata = {
  title: "PakEarth.com | Buy, Sell & Rent or Invest in Property on Pakistan",
  description:
    " PakEarth is the 1st Real Estate online platform in Pakistan to Buy, Sell and Rent houses, plots, shops and flats across Lahore and Karachi or others cities.",
  keywords: [
"Pak Earth",
"Pak Earth real estate",
"Pak Earth property portal",
"Pak Earth Pakistan",
"Real estate Pakistan",
"Pakistan real estate",
"Property in Pakistan",
"Property portal Pakistan",
"Online property portal Pakistan",
"Best property website Pakistan",
"Buy property in Pakistan",
"Sell property in Pakistan",
"Houses for sale in Pakistan",
"Plots for sale in Pakistan",
"Apartments for sale in Pakistan",
"Pakistan real estate projects",
"New real estate projects in Pakistan",
"Housing projects Pakistan",
"Residential housing projects Pakistan",
"Approved housing societies Pakistan",
"Residential properties Pakistan",
"Commercial real estate Pakistan",
"Commercial property for sale Pakistan",
"Karachi real estate",
"Karachi property for sale",
"Karachi housing projects",
"Lahore property",
"Lahore real estate",
"Lahore property for sale",
"Islamabad real estate",
"Islamabad property",
"Islamabad housing projects",
"Property investment Pakistan",
"Real estate investment Pakistan",
"Best property investment Pakistan",
"Plots and houses Pakistan",
"Plots and houses for sale in Pakistan"
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PakEarth.com | Buy, Sell & Rent or Invest in Property on Pakistan",
    description:
      "Find out verified properties and Real Estate projects across Pakistan with PakEarth. Buy, sell or invest in residential and commercial properties nationwide.",
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
