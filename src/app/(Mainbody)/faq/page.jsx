import Faq from '@/components/pages/other-pages/FADPAGE'
import React from 'react'

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | Real Estate Help & Answers",
  description:
    "Find answers to frequently asked questions about our real estate projects in Pakistan. Learn about buying, selling, investing and renting residential and commercial properties.",
  keywords: [
    "Real estate FAQ Pakistan",
    "Property questions Pakistan",
    "Buying property FAQ",
    "Selling property FAQ",
    "Investment in real estate Pakistan"
  ].join(", "),
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/faq` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "FAQ | Real Estate Questions Answered – PakEarth.com",
    description: "Get answers to common real estate questions for residential and commercial properties in Pakistan.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/faq-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Real Estate FAQ Pakistan",
      },
    ],
    type: "website",
  }
};



const page = () => {
  return (
    <div>
      <Faq/>
    </div>
  )
}

export default page