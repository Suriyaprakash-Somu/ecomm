import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  isAuthenticated: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    logoutCustomer: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
      localStorage.removeItem("customer");
    },
  },
});

export const { setCustomer, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
