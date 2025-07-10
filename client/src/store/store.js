import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice";
import adminProductSlice from "../store/admin/index";
import userProductSlice from "../store/user/productSlice";
import userCartSlice from "../store/user/cartSlice";
import userAddressSlice from "../store/user/addressSlice";
import userOrderSlice from "../store/user/orderSlice";
import adminOrderSlice from "../store/admin/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    adminOrder: adminOrderSlice,
    userProducts: userProductSlice,
    userCart: userCartSlice,
    userAddress: userAddressSlice,
    userOrder: userOrderSlice,
  },
});

export default store;
