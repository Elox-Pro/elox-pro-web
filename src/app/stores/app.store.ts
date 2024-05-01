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



import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from "@reduxjs/toolkit";

export const apiMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {
        // Check if the action is from an RTK Query API
        if (action.meta?.requestStatus) {
            switch (action.meta.requestStatus) {
                case 'pending':
                    // Handle pending state
                    console.log('API request is pending');
                    break;
                case 'fulfilled':
                    // Handle fulfilled state
                    console.log('API request is fulfilled');
                    break;
                case 'rejected':
                    // console.log('API request is rejected', action);
                    // Handle rejected state
                    if (isRejectedWithValue(action)) {
                        // Access the error payload
                        console.error('API request failed:', action.payload);
                    }
                    //  else if (!action.meta.aborted) {
                    //     console.error('API request failed', action.meta);
                    // }
                    break;
                default:
                    break;
            }
        }

        return next(action);
    };

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
            apiMiddleware,
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
