import OTPPage from '@/components/screen/OTPPage'
import React from 'react'

export const metadata = {
  title: "OTP Verification | Pak Earth",
  description: "Verify your Pak Earth account using the One-Time Password (OTP) sent to your registered email or phone.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/otp-verify` },
  robots: { index: false, follow: false }, // Keep private
};


const page = () => {
  return (
    <div>
        <OTPPage/>
    </div>
  )
}

export default page