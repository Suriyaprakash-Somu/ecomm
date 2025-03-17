import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.product_id === item.product_id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += Number(item.price);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (i) => i.product_id === productId
      );

      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalPrice -=
          state.cartItems[itemIndex].price *
          state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },

    updateQuantity: (state, action) => {
      const { product_id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.product_id === product_id);

      if (item && quantity > 0) {
        const quantityDiff = quantity - item.quantity;
        state.totalQuantity += quantityDiff;
        state.totalPrice += quantityDiff * item.price;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
