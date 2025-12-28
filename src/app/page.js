import BodyContent from "@/components/home/search-tab";
import FooterFour from "@/layout/footers/FooterFour";
import { Fragment } from "react";

const SearchTab = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     !ConfigDB.PrimaryColor && document.documentElement.style.setProperty("--theme-default", "#f35d43");
  //     !ConfigDB.SecondaryColor && document.documentElement.style.setProperty("--theme-default2", "#f34451");
  //   }, 0.1);
  // }, []);
  return (
    <Fragment>
      <BodyContent />
      <FooterFour />
    </Fragment>
  );
};

export default SearchTab;
