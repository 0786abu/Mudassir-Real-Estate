
import ResetPasswordSection from "@/components/screen/ResetPasswordSection";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import FooterThree from "@/layout/footers/FooterThree";

const ResetPassword = async({params}) => {
    const {token} = await params;
    console.log(token)
  return (
    <div>
      <Breadcrumb page="Reset" />
      <ResetPasswordSection token={token}/>
      <FooterThree />
    </div>
  );
};

export default ResetPassword;
