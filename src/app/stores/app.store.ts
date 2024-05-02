import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../auth/api/auth.api";
import { profileApi } from "../../profile/api/profile.api";
import { tfaApi } from "../../tfa/api/tfa.api";
import cpSidebarReducer from "../../cpanel/features/cp-sidebar.slice";
import cpSidebarOffcanvasReducer from "../../cpanel/features/cp-sidebar-off-canvas.slice";
import tfaReducer from "../../tfa/features/tfa.slice";
import { recoverPasswordApi } from "../../recover-password/api/recover-password.api";
import recoverPasswordReducer from "../../recover-password/features/recover-password.slice";
import profileReducer from "../../profile/features/profile.slice";
import { avatarApi } from "../../avatar/api/avatar.api";
import commonReducer from "../../common/features/common.slice";
import avatarReducer from "../../avatar/features/avatar.slice";
import authReducer from "../../auth/features/auth.slice";
import { rtkQueryMiddleware } from "../middlewares/rtk-api.middlaware";


export const appStore = configureStore({
    reducer: {
        tfa: tfaReducer,
        recoverPassword: recoverPasswordReducer,
        cpSidebar: cpSidebarReducer,
        cpSidebarOffcanvas: cpSidebarOffcanvasReducer,
        profile: profileReducer,
        common: commonReducer,
        avatar: avatarReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tfaApi.reducerPath]: tfaApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [recoverPasswordApi.reducerPath]: recoverPasswordApi.reducer,
        [avatarApi.reducerPath]: avatarApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            rtkQueryMiddleware,
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
