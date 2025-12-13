import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    myProperties:[],
    myProperty:null,
    mypropertyloading:false,
    createpropertyloading:false,
    removepropertyimageloading:false,
    totalPages:null,
    currentPage:null,
    error:null
}

const propertySice = createSlice({
    name:"Property",
    initialState,
    reducers:{
       setCreatePropertyLoading:(state,action)=>{
        if(action.payload === undefined){
            state.createpropertyloading = true
        }else{
            state.createpropertyloading = action.payload
        }
       },
       setRemovePropertyImageLoading:(state,action)=>{
        if(action.payload === undefined){
            state.removepropertyimageloading = true
        }else{
            state.removepropertyimageloading = action.payload
        }
       },
       setMyProperty:(state,action)=>{
        state.myProperty = action.payload
       },
       setPagesContent:(state,action)=>{
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage;
       },
       setUpdateProeprty:(state,action)=>{
        state.createpropertyloading = false
        state.error = null
        state.myProperties = state.myProperties.map((item)=>item._id === action.payload._id ? action.payload : item)
       },
       setMyProperties:(state,action)=>{
        state.mypropertyloading = false
        state.error = null
        state.myProperties = action.payload
       },
       setMyPropertyLoading:(state,action)=>{
        state.mypropertyloading = action.payload
       },
       setPropertyError:(state,action)=>{
        state.error = action.payload
       }
    }
});

export const {setCreatePropertyLoading,setPropertyError,setMyProperties,setMyPropertyLoading,setPagesContent,setMyProperty,setUpdateProeprty,setRemovePropertyImageLoading} = propertySice.actions;

export default propertySice.reducer;