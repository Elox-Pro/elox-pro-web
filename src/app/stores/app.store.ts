import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "../../auth/api/auth.api";
import { usersApi } from "../../dashboard/children/users/api/user.api";
import dashboardSidebarReducer from "../../dashboard/features/dashbaord-sidebar.slice";
import dashboardSidebarOffcanvasReducer from "../../dashboard/features/dashboard-sidebar-offcanvas.slice";
import authReducer from "../../auth/feautures/auth.slice";

export const appStore = configureStore({
    reducer: {
        login: authReducer,
        dashboardSidebar: dashboardSidebarReducer,
        dashboardSidebarOffcanvas: dashboardSidebarOffcanvasReducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authenticationApi.middleware,
            usersApi.middleware
        )
    },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>