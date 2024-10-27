// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartLibraryReducer from './cartLibrarySlice';

const store = configureStore({
    reducer: {
        cartLibrary: cartLibraryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
