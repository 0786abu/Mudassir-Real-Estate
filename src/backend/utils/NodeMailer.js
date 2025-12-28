import { AdminDeleteProperty, ApprovedFreeProperty, ApprovedPayment, ForGotTemplate, OTPTEMPLATE, RejectedFreeProperty, RejectPayment, ResetPasswordTemplate } from "./Templates";
import nodemailer from "nodemailer"


export const SendEmail = async({email,otpCode,name})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"OTP Verification",
            html:OTPTEMPLATE({otp:otpCode,name})
        }
        await transporter.sendMail(mailOptions);
}

export const ResetPasswordMailer = async({email,link,name})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Reset Password - Real Estate Project",
            html:ResetPasswordTemplate({name,link})
        }
        await transporter.sendMail(mailOptions);
}
export const FreePropertyApprovedMail = async({email,link,name,isFree})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Property Approved - Real Estate Project",
            html:ApprovedFreeProperty({name,link,isFree})
        }
        await transporter.sendMail(mailOptions);
}
export const RejectPropertyApprovedMail = async({email,name,isFree})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Property Approved - Real Estate Project",
            html:RejectedFreeProperty({name,isFree})
        }
        await transporter.sendMail(mailOptions);
}
export const ApprovedPaymentMail = async({email,name,link})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Payment Approved - Property Activated | Real Estate Project",
            html:ApprovedPayment({name,link})
        }
        await transporter.sendMail(mailOptions);
}
export const RejectPaymentMail = async({email,name,reason})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Payment Rejected – Action Required | Real Estate Project",
            html:RejectPayment({name,reason})
        }
        await transporter.sendMail(mailOptions);
}
export const DeletePropertyMail = async({email,name,reason,propertyType,propertyCategory,propertyTitle})=>{
    const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from:`"Real Estate Platform" <${process.env.EMAIL}>`,
            to:email,
            subject:"Your Property Has Been Removed | Real Estate Project",
            html:AdminDeleteProperty({name,reason,propertyTitle,propertyCategory,propertyType})
        }
        await transporter.sendMail(mailOptions);
}