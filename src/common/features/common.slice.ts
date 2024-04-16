import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../types/common.state";

const initialState: CommonState = {
    overlay: {
        active: false,
    },
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setOverlay: (state, action: { payload: boolean }) => {
            state.overlay.active = action.payload;
        },
    }
});

const commonReducer = commonSlice.reducer;
export const { setOverlay } = commonSlice.actions;
export default commonReducer;