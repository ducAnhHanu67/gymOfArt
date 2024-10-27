import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    date: string;
    image?: string;
    rating?: number;
    reviews?: { user: string; comment: string; rating: number }[];
    files?: number;
    tags?: string[];
    category?: string;
    author?: string;
}

export interface CartLibraryState {
    cart: Product[];
    library: Product[];
}

const initialState: CartLibraryState = {
    cart: [],
    library: [],
};

const cartLibrarySlice = createSlice({
    name: 'cartLibrary',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        // Chỉ xóa sản phẩm có id trùng với id được truyền vào payload
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        addToLibrary: (state, action: PayloadAction<Product>) => {
            state.library.push(action.payload);
        },
    },
});

export const { addToCart, removeFromCart, addToLibrary } = cartLibrarySlice.actions;
export default cartLibrarySlice.reducer;
