import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    payments:[],
    createpaymentloading:false,
    paymentloading:false,
    error:null
}

const paymentSlice = createSlice({
    name:"Payment",
    initialState,
    reducers:{
        setCreatePayment:(state,action)=>{
            state.createpaymentloading = false
            state.error = null
            state.payments.push(action.payload);
        },
        setPayments:(state,action)=>{
            state.paymentloading = false
            state.error = null
            state.payments = action.payload
        },
        setCreatePaymentLoading:(state,action)=>{
            if(action.payload === undefined){
                state.createpaymentloading = true
            }else{
                state.createpaymentloading = action.payload
            }
        },
        setPaymentLoading:(state)=>{
            state.paymentloading = true
        },
        setPaymentError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setCreatePayment,setCreatePaymentLoading,setPaymentError,setPaymentLoading,setPayments} = paymentSlice.actions;

export default paymentSlice.reducer;