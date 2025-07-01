import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice";
import adminProductSlice from "../store/admin/index";
import userProductSlice from "../store/user/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    userProducts: userProductSlice,
  },
});

export default store;
