import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Decode JWT safely in Edge runtime
  let decoded;
  try {
    decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  } catch (e) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = decoded.payload.role; // directly from token

  const path = req.nextUrl.pathname;

  // Redirect /dashboard based on role
  if (path === "/dashboard") {
    return NextResponse.redirect(
      new URL(
        role === "admin"
          ? "/admin/dashboard"
          : role === "agent"
          ? "/dashboard/agent-dashboard"
          : "/dashboard/user-dashboard",
        req.url
      )
    );
  }

  // Access control
  if (role === "admin" && !path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (role === "agent" && !path.startsWith("/dashboard/agent-dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    role === "individual" &&
    !path.startsWith("/dashboard/user-dashboard")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/agent-dashboard/:path*",
    "/dashboard/user-dashboard/:path*",
    "/dashboard",
  ],
};
