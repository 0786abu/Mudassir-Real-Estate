import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notifications:[],
    markedloading:false,
    deleteloading:false,
    notificationloading:false,
    totalPages:null,
    totalContacts:null,
    notificationerror:null
}

const notificationsSlice = createSlice({
    name:"Notifications",
    initialState,
    reducers:{
        setNotifications:(state,action)=>{
            state.notificationloading = false
            state.notificationerror = null
            state.notifications = action.payload.notifications
        },
        setNotificationLoading:(state)=>{
            state.notificationloading = true
        },
        setMarkAllAsRead:(state)=>{
            state.markedloading = false
            state.notificationerror = null
            state.notifications = state.notifications.map((noti)=>({...noti,isRead:true}))
        },
        setMarkSingleAsRead:(state)=>{
            state.notifications = state.notifications.map((noti)=>noti._id === action.payload ? {...noti, isRead:true} : noti);
        },
        setNotificationError:(state,action)=>{
            state.notificationerror = action.payload
        },
        setNotificationDelete:(state,action)=>{
            state.deleteloading = false
            state.notificationerror = null
            state.notifications = state.notifications.filter((item)=>item._id !== action.payload)
        },
        setMarkedLoading:(state,action)=>{
            if(action.payload===undefined){
                state.markedloading = true
            }else{
                state.markedloading = action.payload
            }
        },
        setDeleteLoading:(state,action)=>{
            if(action.payload===undefined){
                state.deleteloading = true
            }else{
                state.deleteloading = action.payload
            }
        }
    }
});

export const {setNotificationLoading,setNotifications,setMarkAllAsRead,setMarkedLoading,setNotificationError,setMarkSingleAsRead,setNotificationDelete,setDeleteLoading} = notificationsSlice.actions;

export default notificationsSlice.reducer;