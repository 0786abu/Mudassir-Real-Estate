import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DataBase } from "@/backend/config/database";
import User from "@/backend/model/authModel";
import Agent from "@/backend/model/agentModel";

export async function middleware(req) {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2️⃣ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Connect DB
    await DataBase();

    // 4️⃣ Find user in User or Agent collection
    let user = await User.findById(decoded.id);
    let role = "individual";

    if (!user) {
      user = await Agent.findById(decoded.id);
      role = "agent";
    }

    if (!user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 5️⃣ Handle admin role if stored in user
    if (user.role === "admin") role = "admin";

    // 6️⃣ Get pathname & remove trailing slash
    const path = req.nextUrl.pathname.replace(/\/$/, "");

    // 7️⃣ Redirect "/dashboard" to role-based dashboard
    if (path === "/dashboard") {
      return NextResponse.redirect(
        new URL(
          role === "agent"
            ? "/dashboard/agent-dashboard"
            : role === "individual"
            ? "/dashboard/user-dashboard"
            : "/admin/dashboard",
          req.url
        )
      );
    }

    // 8️⃣ Role-based access control
    if (user?.role === "admin" && !path.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (user?.role === "agent" && !path.startsWith("/dashboard/agent-dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (user?.role === "individual" && !path.startsWith("/dashboard/user-dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 9️⃣ Allow request
    return NextResponse.next();
  } catch (err) {
    console.log("Middleware error:", err.message);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// 🔒 Apply middleware to protected dashboard routes
export const config = {
  runtime: "nodejs",
  matcher: [
    "/admin/:path*",
    "/dashboard/agent-dashboard/:path*",
    "/dashboard/user-dashboard/:path*",
    "/dashboard", // redirect /dashboard to role-based dashboard
  ],
};
