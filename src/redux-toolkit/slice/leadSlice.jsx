import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    myLeads:[],
    myInquiries:[],
    sendInquiryLoading:false,
    leadloading:false,
    error:null
}

const leadSlice = createSlice({
    name:"Lead",
    initialState,
    reducers:{
       setSendInquiryLoading:(state,action)=>{
        if(action.payload===undefined){
            state.sendInquiryLoading = true
        }else{
            state.sendInquiryLoading = action.payload
        }
       },
       setMyLeads:(state,action)=>{
        state.leadloading = false
        state.error = null;
        state.myLeads = action.payload
       },
       setMyInquiries:(state,action)=>{
        state.leadloading = false
        state.error = null;
        state.myInquiries = action.payload
       },
       setLeadLoading:(state,action)=>{
        state.leadloading = action.payload
       },
       setLeadError:(state,action)=>{
        state.error = action.payload
       }
    }
});

export const {setSendInquiryLoading,setLeadError,setLeadLoading,setMyLeads,setMyInquiries} = leadSlice.actions;

export default leadSlice.reducer;