import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    myProperties:[],
    myProperty:null,
    myViewsChartData:{},
    latestProperties:[],
    latestsproperties:[],
    featuredProperties:[],
    adminProperties:[],
    totalAdminProperties:null,
    totalAdminPropertiesPages:null,
    latestpropertyloading:false,
    adminpropertyloading:false,
    featurepropertyloading:false,
    myAvailableProeprtiesChartData:{},
    myTypeChartData:[],
    mypropertyloading:false,
    selectedSlug:null,
    singlepropertyloading:false,
    createpropertyloading:false,
    removepropertyimageloading:false,
    viewsdataloading:false,
    totalPages:null,
    selectedFilterCategory:"Sale",
    currentPage:null,
    error:null
}

const propertySice = createSlice({
    name:"Property",
    initialState,
    reducers:{
       setCreatePropertyLoading:(state,action)=>{
        if(action.payload === undefined){
            state.createpropertyloading = true
        }else{
            state.createpropertyloading = action.payload
        }
       },
       setSelectedFilterCategory:(state,action)=>{
        state.selectedFilterCategory = action.payload
       },
       setRemovePropertyImageLoading:(state,action)=>{
        if(action.payload === undefined){
            state.removepropertyimageloading = true
        }else{
            state.removepropertyimageloading = action.payload
        }
       },
       setMyChartData:(state,action)=>{
        state.viewsdataloading = false
        state.myViewsChartData = action.payload
       },
       setMyTypeChartData:(state,action)=>{
        state.viewsdataloading = false
        state.myTypeChartData = action.payload
       },
       setLatestsproperties:(state,action)=>{
        state.latestpropertyloading = false
        state.latestsproperties = action.payload
       },
       setFeaturedProperties:(state,action)=>{
        state.featurepropertyloading = false
        state.featuredProperties = action.payload
       },
       setLatestproeprtyloading:(state,action)=>{
        state.latestpropertyloading = action.payload
       },
       setFeaturedPropertyLoading:(state,action)=>{
        state.featurepropertyloading = action.payload
       },
       setMyAvailableProeprtiesChartData:(state,action)=>{
        state.viewsdataloading = false
        state.myAvailableProeprtiesChartData = action.payload
       },
       setMyProperty:(state,action)=>{
        state.mypropertyloading = false
        state.error = null
        state.myProperty = action.payload
       },
       setSelectedSlug:(state,action)=>{
          state.selectedSlug = action.payload
        },
        setSinglePropertyLoading:(state,action)=>{
            state.singlepropertyloading = true
        },
       setPagesContent:(state,action)=>{
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage;
       },
       setUpdateProeprty:(state,action)=>{
        state.createpropertyloading = false
        state.error = null
        state.myProperties = state.myProperties.map((item)=>item._id === action.payload._id ? action.payload : item)
       },
       setAdminProeprties:(state,action)=>{
        state.adminpropertyloading = false
        state.error = null
        state.adminProperties = action.payload.properties
        state.totalAdminProperties = action.payload.totalProperties
        state.totalAdminPropertiesPages = action.payload.totalPages
       },
       setViewsChartDataLoading:(state,action)=>{
        state.viewsdataloading = action.payload
       },
       setMyProperties:(state,action)=>{
        state.mypropertyloading = false
        state.error = null
        state.myProperties = action.payload
       },
       setSingleProperty:(state,action)=>{
        state.singlepropertyloading = false
        state.myProperty = action.payload
       },
       setMyPropertyLoading:(state,action)=>{
        state.mypropertyloading = action.payload
       },
       setAdminPropertiesLoading:(state,action)=>{
        state.adminpropertyloading = action.payload
       },
       setPropertyError:(state,action)=>{
        state.error = action.payload
       }
    }
});

export const {setCreatePropertyLoading,setPropertyError,setMyProperties,setMyPropertyLoading,setPagesContent,setMyProperty,setUpdateProeprty,setRemovePropertyImageLoading,setSelectedSlug, setSinglePropertyLoading,setSingleProperty,setMyChartData,setViewsChartDataLoading,setMyTypeChartData,setMyAvailableProeprtiesChartData,setLatestproeprtyloading,setLatestsproperties,setFeaturedProperties,setFeaturedPropertyLoading,setAdminProeprties,setAdminPropertiesLoading,setSelectedFilterCategory} = propertySice.actions;

export default propertySice.reducer;