import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../auth/api/auth.api";
import { usersApi } from "../../dashboard/children/users/api/user.api";
import { tfaApi } from "../../tfa/api/tfa.api";
import dashboardSidebarReducer from "../../dashboard/features/dashbaord-sidebar.slice";
import dashboardSidebarOffcanvasReducer from "../../dashboard/features/dashboard-sidebar-offcanvas.slice";
import authReducer from "../../auth/feautures/auth.slice";
import tfaReducer from "../../tfa/features/tfa.slice";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        tfa: tfaReducer,
        dashboardSidebar: dashboardSidebarReducer,
        dashboardSidebarOffcanvas: dashboardSidebarOffcanvasReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tfaApi.reducerPath]: tfaApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            tfaApi.middleware,
            usersApi.middleware
        )
    },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>