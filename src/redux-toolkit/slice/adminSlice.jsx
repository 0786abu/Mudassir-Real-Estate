import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allproperties:[],
    allusers:[],
    allagents:[],
    payments:[],
    aboutUser:null,
    aboutAgent:null,
    singleProperty:null,
    totalProperties:null,
    paymentloading:false,
    userloading:false,
    agentloading:false,
    featuredloading:false,
    approvedloading:false,
    paymentactionloading:false,
    totalPages:null,
    propertyloading:false,
    error:null
}

const adminSlice = createSlice({
    name:"Admin",
    initialState,
    reducers:{
        setAllProperties:(state,action)=>{
            state.propertyloading = false,
            state.error = null
            state.allproperties = action.payload.properties
            state.totalProperties = action.payload.totalProperties
            state.totalPages = action.payload.totalPages
        },
        setAboutUser:(state,action)=>{
            state.userloading = false
            state.error = null
            state.aboutUser = action.payload
        },
        setAboutAgent:(state,action)=>{
            state.agentloading = false
            state.error = null
            state.aboutAgent = action.payload
        },
        setSingleProperty:(state,action)=>{
            state.propertyloading = false
            state.error = null
            state.singleProperty = action.payload
        },
        setPaymentAction:(state,action)=>{
            state.paymentactionloading = false
            state.error = null
            state.payments = state.payments.map((payment)=>payment._id === action.payload._id ? action.payload : payment)
        },
        setAllusers:(state,action)=>{
            state.userloading = false
            state.error = null
            state.allusers = action.payload
        },
        setAllAgents:(state,action)=>{
            state.agentloading = false
            state.error = null
            state.allagents = action.payload
        },
        setPaymentActionLoading:(state,action)=>{
            if(action.payload===undefined){
                state.paymentactionloading = true
            }else{
                state.paymentactionloading = action.payload
            }
        },
        setFeaturedLoading:(state,action)=>{
            if(action.payload===undefined){
                state.featuredloading = true
            }else{
                state.featuredloading = action.payload
            }
        },
        setApprovedLoading:(state,action)=>{
            if(action.payload===undefined){
                state.approvedloading = true
            }else{
                state.approvedloading = action.payload
            }
        },
        setToggleFeatured:(state,action)=>{
            state.featuredloading = false
            state.singleProperty = action.payload
        },
        setToggleApproved:(state,action)=>{
            state.approvedloading = false
            state.singleProperty = action.payload
        },
        setPropertyLoading:(state)=>{
            state.propertyloading = true
        },
        setPayments:(state,action)=>{
            state.paymentloading = false
            state.error = null
            state.payments = action.payload
        },
        setPaymentLoading:(state)=>{
            state.paymentloading = true
        },
        setUserLoading:(state)=>{
            state.userloading = true
        },
        setAgentLoading:(state)=>{
            state.agentloading = true
        },
        setAdminError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAdminError,setAllProperties,setPropertyLoading,setSingleProperty,setToggleFeatured,setFeaturedLoading,setApprovedLoading,setToggleApproved,setPaymentLoading,setPayments,setPaymentAction,setPaymentActionLoading,setAllusers,setUserLoading,setAboutUser,setAgentLoading,setAllAgents,setAboutAgent} = adminSlice.actions;

export default adminSlice.reducer;