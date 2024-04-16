import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../auth/api/auth.api";
import { profileApi } from "../../profile/api/profile.api";
import { tfaApi } from "../../tfa/api/tfa.api";
import cpSidebarReducer from "../../cpanel/features/cp-sidebar.slice";
import cpSidebarOffcanvasReducer from "../../cpanel/features/cp-sidebar-offcanvas.slice";
import authReducer from "../../auth/feautures/auth.slice";
import tfaReducer from "../../tfa/features/tfa.slice";
import { recoverPasswordApi } from "../../recover-password/api/recover-password.api";
import recoverPasswordReducer from "../../recover-password/features/recover-password.slice";
import ProfileReducer from "../../profile/features/profile.slice";
import { avatarApi } from "../../avatars/api/avatar.api";
import commonReducer from "../../common/features/common.slice";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        tfa: tfaReducer,
        recoverPassword: recoverPasswordReducer,
        cpSidebar: cpSidebarReducer,
        cpSidebarOffcanvas: cpSidebarOffcanvasReducer,
        profile: ProfileReducer,
        common: commonReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tfaApi.reducerPath]: tfaApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [recoverPasswordApi.reducerPath]: recoverPasswordApi.reducer,
        [avatarApi.reducerPath]: avatarApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            tfaApi.middleware,
            profileApi.middleware,
            recoverPasswordApi.middleware,
            avatarApi.middleware
        )
    },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>