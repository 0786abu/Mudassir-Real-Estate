import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    myProperties:[],
    mypropertyloading:false,
    createpropertyloading:false,
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
       setPagesContent:(state,action)=>{
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage;
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

export const {setCreatePropertyLoading,setPropertyError,setMyProperties,setMyPropertyLoading,setPagesContent} = propertySice.actions;

export default propertySice.reducer;