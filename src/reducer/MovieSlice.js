import { createSlice } from "@reduxjs/toolkit";

const MoveSlice = createSlice({
    name: 'movie',
    initialState: {
        activeFilter: 'popularity.desc',
        isFilterModalOpen: false,
    },
    reducers: {
        sortChange: (state, action) => {
            state.activeFilter = action.payload;
        },
        openFilterModal: (state) => {
            state.isFilterModalOpen = true;
        },
        closeFilterModal: (state) => {
            state.isFilterModalOpen = false;
        }
    }
});

export const {sortChange, openFilterModal, closeFilterModal} = MoveSlice.actions;
export default MoveSlice.reducer;