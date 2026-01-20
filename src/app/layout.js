import MainProvider from "./MainProvider";
import "../../public/assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { detectLanguage } from "./i18n/server";
import { I18nProvider } from "./i18n/i18n-context";
// import Navbar from "@/layout/headers/Navbar";
import BootstrapClient from "@/layout/headers/Bootstrap";
import { ToastContainer } from "react-toastify";
import ConditionalNavbar from "@/utils/shoulShowNavbar";
import ConditionalFooter from "@/utils/shouldShowFooter";

export const metadata = {
  title: "Pak Earth",
  description: "Pak Earth – Real Estate & Property Platform Pakistan",
 icons: {
  icon: { url: "/logo.png", type: "image/png" },
}

};


export default async function RootLayout({ children }) {
  const lng = await detectLanguage();
  return (
    <I18nProvider language={lng}>
      <html lang={lng}>
        <head>
          <link rel='icon' href='/logo.png' type='image/x-icon' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png'></link>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap' rel='stylesheet'></link>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
          <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' rel='stylesheet'></link>
          <meta name='theme-color' content='#fff' />
        </head>
        <body>
            <MainProvider>
              <BootstrapClient/>
              <ConditionalNavbar/>
              {children}
              <ConditionalFooter />
              <ToastContainer/>
              </MainProvider>
        </body>
      </html>
    </I18nProvider>
  );
}
