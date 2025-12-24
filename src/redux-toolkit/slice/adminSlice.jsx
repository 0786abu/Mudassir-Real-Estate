import { createSlice } from "@reduxjs/toolkit"
import { act } from "react";


const initialState = {
    allproperties:[],
    singleProperty:null,
    totalProperties:null,
    featuredloading:false,
    approvedloading:false,
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
        setSingleProperty:(state,action)=>{
            state.propertyloading = false
            state.error = null
            state.singleProperty = action.payload
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
        setAdminError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAdminError,setAllProperties,setPropertyLoading,setSingleProperty,setToggleFeatured,setFeaturedLoading,setApprovedLoading,setToggleApproved} = adminSlice.actions;

export default adminSlice.reducer;