import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../auth/api/auth.api";
import { userApi } from "../../users/api/user.api";
import { tfaApi } from "../../tfa/api/tfa.api";
import cpSidebarReducer from "../../cpanel/features/cp-sidebar.slice";
import cpSidebarOffcanvasReducer from "../../cpanel/features/cp-sidebar-offcanvas.slice";
import authReducer from "../../auth/feautures/auth.slice";
import tfaReducer from "../../tfa/features/tfa.slice";
import { recoverPasswordApi } from "../../recover-password/api/recover-password.api";
import recoverPasswordReducer from "../../recover-password/features/recover-password.slice";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        tfa: tfaReducer,
        recoverPassword: recoverPasswordReducer,
        cpSidebar: cpSidebarReducer,
        cpSidebarOffcanvas: cpSidebarOffcanvasReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tfaApi.reducerPath]: tfaApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [recoverPasswordApi.reducerPath]: recoverPasswordApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            tfaApi.middleware,
            userApi.middleware,
            recoverPasswordApi.middleware,
        )
    },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>