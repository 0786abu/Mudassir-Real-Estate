import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    contacts:[],
    contactloading:false,
    createemailloading:false,
    totalPages:null,
    totalContacts:null,
    emailerror:null
}

const emailSlice = createSlice({
    name:"Email",
    initialState,
    reducers:{
        setCreateEmailLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createemailloading = true
            }else{
                state.createemailloading = action.payload
            }
        },
        setEmailError:(state,action)=>{
            state.emailerror = action.payload
        }
    }
});

export const {setCreateEmailLoading,setEmailError} = emailSlice.actions;

export default emailSlice.reducer;