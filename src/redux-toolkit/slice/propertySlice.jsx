import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    createpropertyloading:false,
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
       setPropertyError:(state,action)=>{
        state.error = action.payload
       }
    }
});

export const {setCreatePropertyLoading,setPropertyError} = propertySice.actions;

export default propertySice.reducer;