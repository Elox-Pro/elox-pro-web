import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "../authentication/api/authentication.api";

export const appStore = configureStore({
    reducer: {
        [authenticationApi.reducerPath]: authenticationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authenticationApi.middleware)
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>