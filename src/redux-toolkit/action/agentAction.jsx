import axios from "axios";
import { setAgentError, setAgentLoading, setGetAgents } from "../slice/agentSlice";
import { toast } from "react-toastify";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL


export const FetchAgents = ()=>async(dispatch)=>{
    dispatch(setAgentLoading())
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agents/getAgents`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setGetAgents(data.agents));
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
        dispatch(setAgentError(error?.response?.data?.message || error?.response?.data?.error));
    }
}