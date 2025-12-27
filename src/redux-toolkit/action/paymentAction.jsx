import axios from "axios";
import { setCreatePayment, setCreatePaymentLoading, setPaymentError, setPaymentLoading, setPayments } from "../slice/paymentSlice";
import { toast } from "react-toastify";
import { setMyProperty } from "../slice/propertySlice";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const CreatePayment = ({formData,setMakePayment,setPaidModal})=>async(dispatch)=>{
    dispatch(setCreatePaymentLoading())
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/createPayment`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setCreatePayment(data.data));
        dispatch(setMyProperty(data.property));
        setMakePayment(false);
        setPaidModal(false);
        toast.success(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPaymentError(error?.response?.data?.message || error?.response?.data?.error));
    } finally {
        dispatch(setCreatePaymentLoading(false));
    }
}
export const getPayments = ()=>async(dispatch)=>{
    dispatch(setPaymentLoading())
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/createPayment`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        console.log(data.payments)
        dispatch(setPayments(data.payments));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setPaymentError(error?.response?.data?.message || error?.response?.data?.error));
    }
}