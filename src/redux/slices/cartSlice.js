import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, actions) => {
            const newItem = actions.payload
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            state.totalQuantity++

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.totalAmount = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
        },
        updateItem: (state, action) => {
            const updatedItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === updatedItem.id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;

                existingItem.quantity = updatedItem.quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;

                state.totalQuantity += existingItem.quantity;
                state.totalAmount += existingItem.totalPrice;
            }
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;