// cart-slice.js
import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const initialState = {
  cart: [],
  totalValue: 0,
  isLoading: false,
  errors: false,
};

// Reducers for cart actions
const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the item is already in the cart
      const itemIndex = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.size?.toLowerCase() === action.payload.size?.toLowerCase() &&
          item.crust?.toLowerCase() === action.payload.crust?.toLowerCase()
      );
      if (itemIndex >= 0) {
        // Item already exists, update the quantity
        state.cart[itemIndex].quantity += 1;
      } else {
        // Add new item to the cart
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.totalValue = calculateTotal(state.cart);
    },
    updateToCart: (state, action) => {
      const { id, size, crust, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.id === id && item.size === size && item.crust === crust
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = quantity;
      }
      state.totalValue = calculateTotal(state.cart);
    },
    updateQuantity: (state, action) => {
      const { id, size, crust, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.id === id && item.size === size && item.crust === crust
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = quantity;
      }
      state.totalValue = calculateTotal(state.cart);
    },
    deleteFromCart: (state, action) => {
      const { id, size, crust } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(item.id === id && item.size === size && item.crust === crust)
      );
      state.totalValue = calculateTotal(state.cart);
    },
    calculateTotal: (state) => {
      state.totalValue = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalValue = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
