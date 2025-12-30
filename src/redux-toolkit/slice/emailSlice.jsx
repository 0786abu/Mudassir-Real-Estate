import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    emails:[],
    emailloading:false,
    createemailloading:false,
    totalPages:null,
    totalEmails:null,
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
        setEmails:(state,action)=>{
            state.emailloading = false
            state.emailerror = null
            state.emails = action.payload.emails
            state.totalEmails = action.payload.totalEmails
            state.totalPages = action.payload.totalPages
        },
        setDeleteEmail:(state,action)=>{
            state.createemailloading = false
            state.emailerror = null
            state.emails = state.emails.filter((email)=>email._id !== action.payload);
        },
        setEmailLoading:(state)=>{
            state.emailloading = true
        },
        setEmailError:(state,action)=>{
            state.emailerror = action.payload
        }
    }
});

export const {setCreateEmailLoading,setEmailError,setEmails,setEmailLoading,setDeleteEmail} = emailSlice.actions;

export default emailSlice.reducer;