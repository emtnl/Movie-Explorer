import { createSlice } from "@reduxjs/toolkit";

const MoveSlice = createSlice({
    name: 'movie',
    initialState: {
        activeFilter: 'popularity.desc',
        filters: {
            genreId: null,
            yearFrom: null,
            yearTo: null,
            minRating: null,
        },
        isFilterModalOpen: false,
    },
    reducers: {
        sortChange: (state, action) => {
            state.activeFilter = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        openFilterModal: (state) => {
            state.isFilterModalOpen = true;
        },
        closeFilterModal: (state) => {
            state.isFilterModalOpen = false;
        }
    }
});

export const {sortChange, setFilters, openFilterModal, closeFilterModal} = MoveSlice.actions;
export default MoveSlice.reducer;