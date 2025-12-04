import axios from "axios";
import { toast } from "react-toastify";
import { setAuthError, setLogoutLoading, setRegisterloading, setResendEmailloading, setSampleUser, setSocialLoading, setUploadLoading, setUser, setUserLoading } from "../slice/authSlice";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const RegisterUser = (user,onClickForForgot,router)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/register`,user,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        onClickForForgot()
        router.push("/otp-verify");
        localStorage.setItem("real_estate_project_user_email",JSON.stringify(data.user.email));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const VerifyOTP = (otp,router)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/otpVerify`,{otpCode:otp},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        router.push("/");
        const sampledata = {
            _id:data.user._id,
            name:data.user.name,
            profile:data.role==="agent" ? data.user.agencyProfile : data.user.profile,
            role:data.user.role
        }
        dispatch(setSampleUser(sampledata));
        localStorage.setItem("sample_user_data", JSON.stringify(sampledata));
        localStorage.removeItem("real_estate_project_user_email");
        localStorage.setItem("real-estate-user-token",data.token);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const VerifyPhoneOTP = (otp,setModal)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/verifyPhone/verifyPhoneOTP`,{otpCode:otp},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message)
        dispatch(setUser(data.user));
        setModal(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const SendOTPOnPhone = (phone,setTimer,setIsSendRequest)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/verifyPhone`,{phone},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        setTimer(60);
        setIsSendRequest(true)
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const MyProfileData = ()=>async(dispatch)=>{
    dispatch(setUserLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/auth/login`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setUser(data.user));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    }
}
export const LoginUser = ({user,onClickForForgot})=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/login`,user,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        console.log(data)
        toast.success(data.message);
        onClickForForgot()
        const sampledata = {
            _id:data?.user?._id,
            name:data?.user?.name,
            profile:data?.user.role==="agent" ? data?.user?.agencyProfile : data?.user?.profile,
            role:data?.user?.role
        }
        dispatch(setSampleUser(sampledata))
        localStorage.setItem("sample_user_data", JSON.stringify(sampledata));
        localStorage.setItem("real-estate-user-token",data.token);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const Resend_Email = (email,setTimer)=>async(dispatch)=>{
    dispatch(setResendEmailloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/resend`,{email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        setTimer(60)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setResendEmailloading(false));
    }
}
export const Resend_PhoneOTP = (phone,setTimer)=>async(dispatch)=>{
    dispatch(setResendEmailloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/resend/resendPhoneOTP`,{phone},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        setTimer(60)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setResendEmailloading(false));
    }
}
export const Logout_User = (router)=>async(dispatch)=>{
    dispatch(setLogoutLoading())
    try {
        const {data} = await axios.get(`${baseURL}/api/auth/register`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setSampleUser(null));
        localStorage.removeItem("real_estate_project_user_email");
        localStorage.removeItem("real-estate-user-token");
        localStorage.removeItem("sample_user_data");
        toast.success(data.message)
        router.push("/")
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setLogoutLoading(false));
    }
}
export const UserUpdateProfile = (formdata,setModal)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.put(`${baseURL}/api/auth/register`,formdata,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        dispatch(setUser(data.newUser));
        setModal(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const AgentUpdateProfile = (formdata,setModal)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.put(`${baseURL}/api/auth/login`,formdata,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        dispatch(setUser(data.newUser));
        setModal(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const AgentUpdateSocialMedia = (dataa,setModal)=>async(dispatch)=>{
    dispatch(setSocialLoading())
    try {
        const {data} = await axios.put(`${baseURL}/api/auth/resend`,{socialMedia:dataa},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        dispatch(setUser(data.user));
        setModal()
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setSocialLoading(false));
    }
}
export const ChangePassword = (passwordData,setModal)=>async(dispatch)=>{
    dispatch(setRegisterloading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/change-password`,passwordData,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast.success(data.message);
        setModal(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setRegisterloading(false));
    }
}
export const UploadProfile = (picture,setPreview)=>async(dispatch)=>{
    dispatch(setUploadLoading())
    try {
        const {data} = await axios.post(`${baseURL}/api/auth/uploadPicture`,picture,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        toast.success(data.message);
        dispatch(setUser(data.user));
         const sampledata = {
            _id:data?.user?._id,
            name:data?.user?.name,
            profile:data?.user.role==="agent" ? data?.user?.agencyProfile : data?.user?.profile,
            role:data?.user?.role
        }
        localStorage.setItem("sample_user_data", JSON.stringify(sampledata));
        setPreview("")
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAuthError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setUploadLoading(false));
    }
}