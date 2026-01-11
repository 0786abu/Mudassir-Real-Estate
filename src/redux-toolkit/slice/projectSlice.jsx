import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    projects:[],
    projectloading:false,
    createprojectloading:false,
    projecterror:null
}

const projectSlice = createSlice({
    name:"Project",
    initialState,
    reducers:{
        setCreateProjectLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createprojectloading = true
            }else{
                state.createprojectloading = action.payload
            }
        },
        setProjects:(state,action)=>{
            state.projectloading = false
            state.projecterror = null
            state.projects = action.payload.projects
        },
        setProjectError:(state,action)=>{
            state.projecterror = action.payload
        }
    }
});

export const {setCreateProjectLoading,setProjectError,setProjects} = projectSlice.actions;

export default projectSlice.reducer;