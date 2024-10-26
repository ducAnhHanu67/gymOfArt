// cartLibrarySlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface CartLibraryState {
    cart: any[]; // Replace 'any' with your actual product type
    library: any[]; // Replace 'any' with your actual product type
}

const initialState: CartLibraryState = {
    cart: [],
    library: []
};

const cartLibrarySlice = createSlice({
    name: 'cartLibrary',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find((product) => product.id === item.id);
            if (!existingItem) {
                state.cart.push(item);
            }
        },
        addToLibrary: (state, action) => {
            const item = action.payload;
            const existingItem = state.library.find((product) => product.id === item.id);
            if (!existingItem) {
                state.library.push(item);
            }
        },
    },
});

export const { addToCart, addToLibrary } = cartLibrarySlice.actions;
export default cartLibrarySlice.reducer;
