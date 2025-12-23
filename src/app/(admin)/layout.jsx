"use client";
import Customizer from "@/adminComponents/layout/customizer/Customizer";
import Header from "@/adminComponents/layout/header";
import Sidebar from "@/adminComponents/layout/sidebar";
import TapToTop from "@/adminComponents/layout/TapToTop";
// import Footer from "@/components/Common/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [toggle, setToggle] = useState();

  const handleResize = () => {
    if (window.innerWidth > 991) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  useEffect(() => {
    setToggle(window.innerWidth > 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  return (
    <div className='page-wrapper'>
      <Header setToggle={setToggle} toggle={toggle} />
      <div className='page-body-wrapper'>
        <Sidebar toggle={toggle} setToggle={setToggle} />
        <div className='page-body'>{children}</div>
        {/* <Footer /> */}
      </div>
      <TapToTop />
      <Customizer />
    </div>
  );
}
