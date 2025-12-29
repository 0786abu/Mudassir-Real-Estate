import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    contacts:[],
    contactloading:false,
    createcontactloading:false,
    totalPages:null,
    totalContacts:null,
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
        setContacts:(state,action)=>{
            state.contactloading = false
            state.contacterror = null
            state.contacts = action.payload.contacts
            state.totalPages = action.payload.totalPages
            state.totalContacts = action.payload.totalContacts
        },
        setDeleteContact:(state,action)=>{
            state.createcontactloading = false
            state.contacterror = null
            state.contacts = state.contacts.filter((contact)=>contact._id !==action.payload._id)
        },
        setContactError:(state,action)=>{
            state.contacterror = action.payload
        },
        setContactLoading:(state)=>{
            state.contactloading = true
        }
    }
});

export const {setContactError,setContactLoading,setCreateContactLoading,setContacts,setDeleteContact} = contactSlice.actions;

export default contactSlice.reducer;