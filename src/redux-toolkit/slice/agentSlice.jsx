import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    agents:[],
    agentloading:false,
    latestProperties:[],
    gridStyle:"grid-view",
    error:null
}

const agentSlice = createSlice({
    name:"Agent",
    initialState,
    reducers:{
        setGetAgents:(state,action)=>{
            state.agentloading = false,
            state.error = null
            state.agents = action.payload
        },
        setAgentLoading:(state)=>{
            state.agentloading = true
        },
        setChangeView:(state,action)=>{
            state.gridStyle = action.payload
    },
        setLatestProeprty:(state,action)=>{
            state.latestProperties = action.payload
        },
        setAgentError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAgentError,setAgentLoading,setGetAgents,setLatestProeprty,setChangeView} = agentSlice.actions;

export default agentSlice.reducer;