import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    projects:[],
    project:null,
    projectloading:false,
    totalPages:null,
    totalProjects:null,
    updateItemsloading:false,
    delfloorplanloading:false,
    delpaymentplanloading:false,
    toggleloading:false,
    devplatloading:false,
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
        setDevPlatLoading:(state,action)=>{
            if(action.payload===undefined){
                state.devplatloading = true
            }else{
                state.devplatloading = action.payload
            }
        },
        setToggleLoading:(state,action)=>{
            if(action.payload===undefined){
                state.toggleloading = true
            }else{
                state.toggleloading = action.payload
            }
        },
        setDeletePaymentPlanLoading:(state,action)=>{
            if(action.payload===undefined){
                state.delpaymentplanloading = true
            }else{
                state.delpaymentplanloading = action.payload
            }
        },
        setUpdateItemsLoading:(state,action)=>{
            if(action.payload===undefined){
                state.updateItemsloading = true
            }else{
                state.updateItemsloading = action.payload
            }
        },
        setDelFloorPlanLoading:(state,action)=>{
            if(action.payload===undefined){
                state.delfloorplanloading = true
            }else{
                state.delfloorplanloading = action.payload
            }
        },
        setProjectFeaturedToggle:(state,action)=>{
            state.toggleloading = false
            state.projecterror = null
            state.project = {...state.project, isFeatured:!state.project.isFeatured}
        },
        setProjectSponsoredToggle:(state)=>{
            state.toggleloading = false
            state.projecterror = null
            state.project = {...state.project, isSponsored:!state.project.isSponsored}
        },
        setDeleteFloorPlan:(state,action)=>{
            state.delfloorplanloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setAddFloorPlans:(state,action)=>{
            state.updateItemsloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setProjects:(state,action)=>{
            state.projectloading = false
            state.projecterror = null
            state.projects = action.payload.projects
            state.totalPages = action.payload.totalPages
            state.totalProjects = action.payload.totalProjects
        },
        setUpdateProjectItems:(state,action)=>{
            state.updateItemsloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setAddPaymentImages:(state,action)=>{
            state.updateItemsloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setProject:(state,action)=>{
            state.projectloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setDeletePaymentPlan:(state,action)=>{
            state.delfloorplanloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setChangeDevelopedBy:(state,action)=>{
            state.devplatloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setUpdateProjectDetails:(state,action)=>{
            state.createprojectloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setChangeMarketingBy:(state,action)=>{
            state.devplatloading = false
            state.projecterror = null
            state.project = action.payload
        },
        setProjectLoading:(state)=>{
            state.projectloading = true
        },
        setProjectError:(state,action)=>{
            state.projecterror = action.payload
        }
    }
});

export const {setCreateProjectLoading,setProjectError,setProjects,setProjectLoading,setProject,setUpdateItemsLoading,setUpdateProjectItems,setDelFloorPlanLoading,setDeleteFloorPlan,setAddFloorPlans,setAddPaymentImages,setDeletePaymentPlan,setDeletePaymentPlanLoading,setProjectFeaturedToggle,setProjectSponsoredToggle,setToggleLoading,setChangeDevelopedBy,setChangeMarketingBy,setDevPlatLoading,setUpdateProjectDetails} = projectSlice.actions;

export default projectSlice.reducer;