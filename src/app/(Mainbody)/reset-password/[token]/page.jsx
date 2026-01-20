
import ResetPasswordSection from "@/components/screen/ResetPasswordSection";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";


export const metadata = {
  title: "Reset Password | Pak Earth",
  description: "Set a new password for your Pak Earth account securely. Keep your account safe and protected.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password` },
  robots: { index: false, follow: false }, // Don't index
};


const ResetPassword = async({params}) => {
    const {token} = await params;
  return (
    <div>
      <Breadcrumb page="Reset" />
      <ResetPasswordSection token={token}/>
    </div>
  );
};

export default ResetPassword;
