import TermsAndConditions from '@/components/pages/other-pages/Term_Condition'
import React from 'react'

export const metadata = {
  title: "Terms & Conditions | Pak Earth Services Pakistan",
  description:
    "Read the terms and conditions of using our Pak Earth website in Pakistan. Covers property listings, client interactions, and platform usage policies.",
  keywords: [
    "Terms and conditions real estate Pakistan",
    "Property website rules",
    "Client agreement real estate",
    "Real estate platform terms"
  ].join(", "),
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms & Conditions | Pak Earth Services Pakistan",
    description: "Review the terms and conditions for using our real estate services and platform in Pakistan.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/terms-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Terms & Conditions Pakistan",
      },
    ],
    type: "website",
  }
};


const page = () => {
  return (
    <div>
      <TermsAndConditions/>
    </div>
  )
}

export default page