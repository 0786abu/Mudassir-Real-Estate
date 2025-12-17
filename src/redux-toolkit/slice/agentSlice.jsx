import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    agents:[],
    agentloading:false,
    latestProperties:[],
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
        setLatestProeprty:(state,action)=>{
            state.latestProperties = action.payload
        },
        setAgentError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAgentError,setAgentLoading,setGetAgents,setLatestProeprty} = agentSlice.actions;

export default agentSlice.reducer;