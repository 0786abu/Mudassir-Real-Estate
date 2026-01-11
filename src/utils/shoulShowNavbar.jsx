"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/layout/headers/Navbar";
import useHasMounted from "./Mounted";

const hideNavbarRoutes = ["/admin/dashboard","/admin/dashboard/user-profile","/admin/dashboard/payments","/admin/dashboard/create-property","/admin-login","/admin/dashboard/profile","/admin/dashboard/allProperties","/admin/dashboard/singleProperty","/admin/dashboard/allUsers","/admin/dashboard/allAgents","/admin/dashboard/favouriteProperties","/admin/dashboard/myProperties","/admin/dashboard/add-user","/admin/dashboard/add-agent","/admin/dashboard/add-admin","/admin/dashboard/allAdmins","/admin/dashboard/contacts","/admin/dashboard/emails","/admin/dashboard/notifications","/admin/dashboard/addProject"];

const dynamicRoutePatterns = [
  /^\/admin-dashboard-doctor\/.+$/,
  /^\/reset-password\/.+$/,
  /^\/admin-dashboard-types\/.+$/,
    /^\/admin\/dashboard\/allProperties\/[^\/]+$/,
  /^\/admin\/dashboard\/allUsers\/[^\/]+$/,
 /^\/admin\/dashboard\/allAgents\/[^\/]+$/,
 /^\/admin\/dashboard\/allAdmins\/[^\/]+$/,
 /^\/admin\/dashboard\/allProperties\/[^\/]+\/edit$/,
];

const shouldShowNavbar = (pathname) => {
  return !(
    hideNavbarRoutes.includes(pathname) ||
    dynamicRoutePatterns.some((pattern) => pattern.test(pathname))
  );
};

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const mounted = useHasMounted();

  if (!mounted) return null;

  const show = shouldShowNavbar(pathname);

  return show ? <Navbar /> : null;
}