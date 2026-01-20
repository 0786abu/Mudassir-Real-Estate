import ForgotPassword from '@/components/pages/other-pages/Forgot_Password';
import React from 'react'


export const metadata = {
  title: "Forgot Password | Pak Earth",
  description: "Reset your Pak Earth account password securely. Enter your registered email to receive a password reset link.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password` },
  robots: { index: false, follow: false }, // Prevent indexing sensitive pages
};

const page = () => {
  return (
    <div>
      <ForgotPassword/>
    </div>
  )
}

export default page