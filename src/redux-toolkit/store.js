import { configureStore } from "@reduxjs/toolkit";
import compareReducer from "./reducers/addToCompareReducer";
import wishListSlice from "./reducers/addToWishListReducer";
import currencyRed from "./reducers/currencyReducer";
import inputsReducer from "./reducers/inputsReducer";
import gridRed from "./reducers/gridReducer";
import Auth from "./slice/authSlice"
import Agent from "./slice/agentSlice"
import Favourites from "./slice/favouritesSlice"
import Property from "./slice/propertySlice"
import Payment from "./slice/paymentSlice"
import Lead from "./slice/leadSlice"
import Admin from "./slice/adminSlice"
import Contact from "./slice/contactSlice"
import Email from "./slice/emailSlice"

export const store = configureStore({
  reducer: {
    inputsReducer,
    addToWishListReducer: wishListSlice,
    addToCompareReducer: compareReducer,
    currencyReducer: currencyRed,
    gridReducer: gridRed,

    // actuall
    Auth,
    Agent,
    Favourites,
    Property,
    Payment,
    Lead,
    Admin,
    Contact,
    Email
  },
});
