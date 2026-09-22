import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { name, image, price (number), quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, price } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, price, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.name !== action.payload);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;
