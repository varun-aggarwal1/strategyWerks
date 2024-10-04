import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
  hasMoreEntries: true,
  originalList: [],
  isLoading: true,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    nextPage: (state, action) => {
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
      };
    },
    updateHasMore: (state, action) => {
      return {
        ...state,
        hasMoreEntries: action.payload,
      };
    },

    updateOriginalList: (state, newList) => {
      return {
        ...state,
        originalList: [...state.originalList, ...newList.payload],
        isLoading: false,
      };
    },
    resetOriginalList: (state) => {
      return {
        ...state,
        originalList: [],
        isLoading: false,
      };
    },

    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  nextPage,
  updateHasMore,
  updateOriginalList,
  resetOriginalList,
  setLoading,
} = cardsSlice.actions;

export default cardsSlice.reducer;
