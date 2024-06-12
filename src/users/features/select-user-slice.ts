import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { SelectUserState } from "../types/select-user-state.type";
import { User } from "../types/user.type";

const initialState: SelectUserState = {
    modal: {
        show: false
    },
    users: [],
    selectedUser: null,
    total: 0
}

const slice = createSlice({
    name: "selectUser",
    initialState,
    reducers: {
        showSelectUserModal: (state, action: PayloadAction<boolean>) => {
            state.modal.show = action.payload;
        },
        setSelectUserUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setSelectItemSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser = action.payload;
        },
        setSelectUserTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const selectUserReducer = slice.reducer;

export const {
    showSelectUserModal,
    setSelectUserUsers,
    setSelectItemSelectedUser,
    setSelectUserTotal
} = slice.actions;

export default selectUserReducer;