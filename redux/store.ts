import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { mambaApi } from "./api/mambaApi";
import authSlice from "./slices/authSlice";


export const store = configureStore({
    reducer: {
        [mambaApi.reducerPath]: mambaApi.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mambaApi.middleware),
});


setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;