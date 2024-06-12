import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../auth/api/auth.api";
import { profileApi } from "../../profile/api/profile.api";
import { tfaApi } from "../../tfa/api/tfa.api";
import tfaReducer from "../../tfa/features/tfa.slice";
import { recoverPasswordApi } from "../../recover-password/api/recover-password.api";
import recoverPasswordReducer from "../../recover-password/features/recover-password.slice";
import profileReducer from "../../profile/features/profile.slice";
import { avatarApi } from "../../avatar/api/avatar.api";
import commonReducer from "../../common/features/common.slice";
import avatarReducer from "../../avatar/features/avatar.slice";
import authReducer from "../../auth/features/auth.slice";
import { rtkQueryMiddleware } from "../middlewares/rtk-api.middlaware";
import errorReducer from "../../errors/features/error.slice";
import cpReducer from "../../cpanel/features/cp.slice";
import { companyApi } from "../../company/api/company.api";
import companyPaginationReducer from "../../company/features/company-pagination.slice";
import companySearchBarReducer from "../../company/features/company-search-bar.slice";
import companyReducer from "../../company/features/company.slice";
import companyCreateReducer from "../../company/features/create-company.slice";
import companyProgressBarSubmitReducer from "../../company/features/company-progress-bar-submit.slice";
import companyCreateModalReducer from "../../company/features/company-create-modal.slice";
import companyInfoReducer from "../../company/features/company-info.slice";
import companyUpdateNameReducer from "../../company/features/company-update-name.slice";
import selectUserReducer from "../../users/features/select-user-slice";
import searchBarReducer from "../../common/features/search-bar.slice";
import { userApi } from "../../users/api/user.api";
import paginatorReducer from "../../common/features/paginator.slice";
import modalActionReducer from "../../common/features/modal-action.slice";

export const appStore = configureStore({
    reducer: {
        tfa: tfaReducer,
        recoverPassword: recoverPasswordReducer,
        cp: cpReducer,
        profile: profileReducer,
        common: commonReducer,
        avatar: avatarReducer,
        auth: authReducer,
        error: errorReducer,
        company: companyReducer,
        companyPagination: companyPaginationReducer,
        companySearchBar: companySearchBarReducer,
        companyProgressBarSubmit: companyProgressBarSubmitReducer,
        companyCreate: companyCreateReducer,
        companyCreateModal: companyCreateModalReducer,
        companyInfo: companyInfoReducer,
        companyUpdateName: companyUpdateNameReducer,
        selectUser: selectUserReducer,
        searchBar: searchBarReducer,
        paginator: paginatorReducer,
        modalAction: modalActionReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tfaApi.reducerPath]: tfaApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [recoverPasswordApi.reducerPath]: recoverPasswordApi.reducer,
        [avatarApi.reducerPath]: avatarApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            rtkQueryMiddleware,
            authApi.middleware,
            tfaApi.middleware,
            profileApi.middleware,
            recoverPasswordApi.middleware,
            avatarApi.middleware,
            companyApi.middleware,
            userApi.middleware
        )
    },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>