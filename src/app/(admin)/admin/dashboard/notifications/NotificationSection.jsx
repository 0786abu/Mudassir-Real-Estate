"use client";

import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Badge, Spinner, Button } from "reactstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "@/components/common/Loader";
import { AdminFetchNotifications, DeleteNotification, MarkedAsRead, MarkedAsSingleRead } from "@/redux-toolkit/action/notificationsAction";
import { setMarkSingleAsRead } from "@/redux-toolkit/slice/notificationsSlice";
import { Trash } from "react-feather";

dayjs.extend(relativeTime);

export default function AdminNotifications() {
  const {notifications,notificationloading,markedloading,deleteloading} = useSelector((state)=>state.Notifications);
  const dispatch = useDispatch();
  const [ID, setID] = useState("");

  useEffect(() => {
    if(notifications?.length===0){
      dispatch(AdminFetchNotifications());
    }
  }, [dispatch]);

  const router = useRouter();
  const handlePush = (link)=>{
    router.push(link)
  }
  const handleRead = ()=>{
    dispatch(MarkedAsRead())
  }
  const handleassingleRead = (id)=>{
    dispatch(MarkedAsSingleRead(id))
  }
  const handleDelete = (id)=>{
    setID(id)
    dispatch(DeleteNotification(id))
  }
  return (
    <div className="">
      <div className="mb-2">
        <Button onClick={handleRead}>{markedloading ? <div className="d-flex align-items-center gap-1"><span className=" spinner-border" role="status" style={{width:"16px",height:"16px"}}></span> Wait...</div> : "Marked all as read"}</Button>
      </div>
      {notificationloading ? (
        <ProfileLoader/>
      ) : (
        <ListGroup>
          {notifications?.map((n) => (
            <ListGroupItem
              key={n._id}
              className="d-flex justify-content-between position-relative align-items-center mb-2"
              style={{
                borderLeft: n.isRead ? undefined : "5px solid #198754",
                cursor: "pointer",
              }}
              onClick={()=>handleassingleRead(n._id)}
            >
              <div style={{position:"absolute",top:"2px",right:"2px"}}>
                {deleteloading && ID===n._id ? <span className=" spinner-border" role="status" style={{width:"16px",height:"16px"}}></span> : <Trash style={{color:"red",width:"16px",height:"16px"}} onClick={()=>handleDelete(n._id)}/>}
              </div>
              <div>
                <strong>{n.type.replace("_", " ").toUpperCase()}</strong> <br />
                <span>{n.message}</span> <br/>
                {n.link && (
                  <strong onClick={()=>handlePush(n.link)} className=" text-info">Go to page</strong>
                )}
              </div>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                {dayjs(n.createdAt).fromNow()}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
