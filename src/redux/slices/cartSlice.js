import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log("State before adding item:", state);
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      console.log("State after adding item:", state);
    },

    deleteItem: (state, action) => {
      console.log("State before deleting item:", state);
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
      }

      console.log("State after deleting item:", state);
    },

    decrementItem: (state, action) => {
      console.log("State before decrementing item:", state);
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;

        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }

      console.log("State after decrementing item:", state);
    },
    
    updateItem: (state, action) => {
      console.log("State before updating item:", state);
      const updatedItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === updatedItem.id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        existingItem.quantity = updatedItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;

        state.totalQuantity += existingItem.quantity;
        state.totalAmount += existingItem.totalPrice;
      }

      console.log("State after updating item:", state);
    },
  },
});

export const { addItem, deleteItem, decrementItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;