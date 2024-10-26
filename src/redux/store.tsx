// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartLibraryReducer, { CartLibraryState } from './cartLibrarySlice';

// Define the root state type
export type RootState = {
    cartLibrary: CartLibraryState;
};

// Create a store
const store = configureStore({
    reducer: {
        cartLibrary: cartLibraryReducer,
    },
});

// Define typed versions of the useDispatch and useSelector hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
