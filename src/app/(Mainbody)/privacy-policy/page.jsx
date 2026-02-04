import PrivacyPolicy from '@/components/pages/other-pages/Privacy_Policy'
import React from 'react'

export const metadata = {
  title: " PakEarth - Privacy Policy & Data Protection - Property Platform",
  description:
    "Read our privacy policy to understand how we handle personal data, inquiries, and client information on our Pak Earth website in Pakistan.",
  keywords: [
    "Privacy policy Pak Earth Pakistan",
    "Data protection Pakistan",
    "Client information safety",
    "Property website privacy",
  ].join(", "),
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: " PakEarth - Privacy Policy & Data Protection - Property Platform",
    description: "Read PakEarth’s privacy policy explaining how user data and inquiries are managed securely on our real estate platform in Pakistan.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
    siteName: "Pak Earth",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/privacy-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy Pakistan",
      },
    ],
    type: "website",
  }
};



const page = () => {
  return (
    <div>
      <PrivacyPolicy/>
    </div>
  )
}

export default page