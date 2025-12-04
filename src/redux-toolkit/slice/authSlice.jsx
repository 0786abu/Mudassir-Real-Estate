import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:null,
    sampleuser:typeof window !== "undefined" ? JSON.parse(localStorage.getItem("sample_user_data")) ?? null : null,
    userloading:false,
    registerloading:false,
    resendloading:false,
    logoutloading:false,
    socialloading:false,
    uploadloading:false,
    error:null
}

const authSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userloading = false
            state.error = null
            state.user = action.payload
        },
        setRegisterloading:(state,action)=>{
            if(action.payload === undefined){
                state.registerloading = true
            }else{
                state.registerloading = action.payload
            }
        },
        setUploadLoading:(state,action)=>{
            if(action.payload === undefined){
                state.uploadloading = true
            }else{
                state.uploadloading = action.payload
            }
        },
        setSampleUser:(state,action)=>{
            state.sampleuser = action.payload
        },
        setResendEmailloading:(state,action)=>{
            if(action.payload === undefined){
                state.resendloading = true
            }else{
                state.resendloading = action.payload
            }
        },
        setSocialLoading:(state,action)=>{
            if(action.payload === undefined){
                state.socialloading = true
            }else{
                state.socialloading = action.payload
            }
        },
        setLogoutLoading:(state,action)=>{
            if(action.payload === undefined){
                state.logoutloading = true
            }else{
                state.logoutloading = action.payload
            }
        },
        setAuthError:(state,action)=>{
            state.error = action.payload
        },
        setUserLoading:(state)=>{
            state.userloading = true
        }
    }
});

export const {setUser, setRegisterloading, setAuthError, setUserLoading, setResendEmailloading, setLogoutLoading, setSampleUser, setSocialLoading,setUploadLoading} = authSlice.actions;

export default authSlice.reducer;