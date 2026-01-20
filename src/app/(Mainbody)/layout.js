import Customizer from "@/layout/Customizer";
import TapToTop from "@/layout/TapToTop";
import { Fragment } from "react";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      {children}
      <Customizer />
      <TapToTop />
    </Fragment>
  );
}
