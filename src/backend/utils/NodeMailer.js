import { OTPTEMPLATE, ResetPasswordTemplate } from "./Templates";
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