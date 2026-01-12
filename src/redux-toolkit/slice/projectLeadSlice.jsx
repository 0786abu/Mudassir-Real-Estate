import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    leads:[],
    leadloading:false,
    createprojectleadloading:false,
    totalPages:null,
    totalLeads:null,
    leadError:null
}

const projectLeadSlice = createSlice({
    name:"ProjectLead",
    initialState,
    reducers:{
        setCreateLeadLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createprojectleadloading = true
            }else{
                state.createprojectleadloading = action.payload
            }
        },
        setLeads:(state,action)=>{
            state.leadloading = false
            state.leadError = null
            state.leads = action.payload.leads
            state.totalPages = action.payload.totalPages
            state.totalLeads = action.payload.totalLeads
        },
        setDeleteLead:(state,action)=>{
            state.createprojectleadloading = false
            state.leadError = null
            state.leads = state.leads.filter((lead)=>lead._id !==action.payload._id)
        },
        setLeadError:(state,action)=>{
            state.leadError = action.payload
        },
        setLeadLoading:(state)=>{
            state.leadloading = true
        }
    }
});

export const {setCreateLeadLoading,setDeleteLead,setLeadError,setLeadLoading, setLeads} = projectLeadSlice.actions;

export default projectLeadSlice.reducer;