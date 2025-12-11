import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    favProperties:[],
    favloading:false,
    addfavloading:false,
    error:null
}

const favouriteSlice = createSlice({
    name:"Favourites",
    initialState,
    reducers:{
        // Add reducers here as needed
        setAddToFavourites:(state,action)=>{
            state.favloading = false
            state.error = null
            state.favProperties.push(action.payload);
        },
        setFavourites:(state,action)=>{
            state.favloading = false
            state.error = null
            state.favProperties = action.payload;
        },
        setRemoveFromFavourites:(state,action)=>{
            state.favloading = false
            state.error = null
            state.favProperties = state.favProperties.filter(property => property._id !== action.payload);
        },
        setAddToFavLoading:(state,action)=>{
            if(action.payload === undefined){
                state.addfavloading = true
            }else{
                state.addfavloading = action.payload
            }
        },
        setFavLoading:(state)=>{
            state.favloading = true
        },
        setFavError:(state,action)=>{
            state.favloading = false
            state.error = action.payload
        }
    }
});

export const {setAddToFavLoading, setFavourites, setAddToFavourites,setFavError,setFavLoading,setRemoveFromFavourites} = favouriteSlice.actions;

export default favouriteSlice.reducer;