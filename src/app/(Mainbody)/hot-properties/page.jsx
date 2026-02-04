import ProfileLoader from '@/components/common/Loader'
import HotProperties from '@/components/property/HotProperties'
import React, { Suspense } from 'react'

export const metadata = {
  title: "Browse Hot Property Listings in Pakistan | PakEarth.com",
  description:
    "Check out the hottest properties in Pakistan – including top residential, commercial and rental listings. Browse trending real estate opportunities in Karachi, Lahore, Islamabad and beyond.",
  keywords: [
    "Hot properties Pakistan",
    "Trending real estate Pakistan",
    "Top property listings",
    "Residential and commercial hot deals",
    "Real estate investment Pakistan"
  ].join(", "),
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/hot-properties` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hot Properties in Pakistan | Trending Real Estate Listings",
    description: "Explore trending real estate listings and hot properties across Pakistan.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hot-properties`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/hot-properties-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Hot Properties Pakistan",
      },
    ],
    type: "website",
  }
};


const page = ({searchParams}) => {
  return (
    <div>
      <Suspense fallback={<ProfileLoader/>} key={JSON.stringify(searchParams)}>
        <HotProperties searchParams={searchParams}/>
      </Suspense>
      </div>
  )
}

export default page