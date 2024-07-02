import { Repository } from 'types/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  repositories: Repository[];
  searchQuery: string;
  currentPage: number;
  reposCount: number;
  totalPages: number;
  step: number;
}

const initialState: SearchState = {
  repositories: [],
  searchQuery: '',
  currentPage: 1,
  reposCount: 0,
  totalPages: 0,
  step: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setRepositories: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setReposCount: (state, action: PayloadAction<number>) => {
      state.reposCount = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const {
  setRepositories,
  setSearchQuery,
  setCurrentPage,
  setReposCount,
  setTotalPages,
  setStep,
} = searchSlice.actions;