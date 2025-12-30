import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notifications:[],
    markedloading:false,
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
        setMarkedLoading:(state,action)=>{
            if(action.payload===undefined){
                state.markedloading = true
            }else{
                state.markedloading = action.payload
            }
        }
    }
});

export const {setNotificationLoading,setNotifications,setMarkAllAsRead,setMarkedLoading,setNotificationError,setMarkSingleAsRead} = notificationsSlice.actions;

export default notificationsSlice.reducer;