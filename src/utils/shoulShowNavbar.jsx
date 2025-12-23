"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/layout/headers/Navbar";
import useHasMounted from "./Mounted";

const hideNavbarRoutes = ["/admin/dashboard","/admin/dashboard/user-profile","/admin/dashboard/payments","/admin/dashboard/create-property","/admin-login","/admin/dashboard/profile","/admin/dashboard/allProperties"];

const dynamicRoutePatterns = [
  /^\/admin-dashboard-doctor\/.+$/,
  /^\/reset-password\/.+$/,
  /^\/admin-dashboard-types\/.+$/,
    /^\/admin\/dashboard\/allblogs\/[^\/]+$/,
     /^\/admin\/dashboard\/allproducts\/[^\/]+$/,
 /^\/admin\/dashboard\/allproducts\/[^\/]+\/edit$/,
 /^\/admin\/dashboard\/allblogs\/[^\/]+\/edit$/,
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