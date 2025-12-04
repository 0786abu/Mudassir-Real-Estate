import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    agents:[],
    agentloading:false,
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
        setAgentError:(state,action)=>{
            state.error = action.payload
        }
    }
});

export const {setAgentError,setAgentLoading,setGetAgents} = agentSlice.actions;

export default agentSlice.reducer;