import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    contacts:[],
    contactloading:false,
    createcontactloading:false,
    contacterror:null
}

const contactSlice = createSlice({
    name:"Contact",
    initialState,
    reducers:{
        setCreateContactLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createcontactloading = true
            }else{
                state.createcontactloading = action.payload
            }
        },
        setContactError:(state,action)=>{
            state.contacterror = action.payload
        },
        setContactLoading:(state)=>{
            state.contactloading = true
        }
    }
});

export const {setContactError,setContactLoading,setCreateContactLoading} = contactSlice.actions;

export default contactSlice.reducer;