import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allproperties:[],
    totalProperties:null,
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
        setPropertyLoading:(state)=>{
            state.propertyloading = true
        },
        setAdminError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAdminError,setAllProperties,setPropertyLoading} = adminSlice.actions;

export default adminSlice.reducer;