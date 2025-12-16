import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    myProperties:[],
    myProperty:null,
    myViewsChartData:{},
    mypropertyloading:false,
    selectedSlug:null,
    singlepropertyloading:false,
    createpropertyloading:false,
    removepropertyimageloading:false,
    viewsdataloading:false,
    totalPages:null,
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
       setPropertyError:(state,action)=>{
        state.error = action.payload
       }
    }
});

export const {setCreatePropertyLoading,setPropertyError,setMyProperties,setMyPropertyLoading,setPagesContent,setMyProperty,setUpdateProeprty,setRemovePropertyImageLoading,setSelectedSlug, setSinglePropertyLoading,setSingleProperty,setMyChartData,setViewsChartDataLoading} = propertySice.actions;

export default propertySice.reducer;