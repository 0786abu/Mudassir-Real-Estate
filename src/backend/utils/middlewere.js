import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { DataBase } from "../config/database";
import Agent from "../model/agentModel";
import User from "../model/authModel";

export const isAuthenticated = async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore?.get("token");
      if (!token) return null;
    await DataBase();
    const decoded = jwt.verify(token?.value, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    if(!user){
        user = await Agent.findById(decoded.id)
    }
    if (!user) return null;
    return user || null;
  } catch (error) {
    return false;
  }
};


export const isAuthorized = async ()=>{
    const user = await isAuthenticated();
    if(!user || user.role !== "admin") return null;
    return user;
}