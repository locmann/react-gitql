import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardState {
  repoName: string;
  stars: number;
  lastCommitDate: string;
  photoUrl: string;
  ownerName: string;
  languages: string[];
  description: string;
  url: string;
}

const initialState: CardState = {
  ownerName: '',
  repoName: '',
  description: '',
  languages: [],
  lastCommitDate: '',
  photoUrl: '',
  stars: 0,
  url: '',
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setOwnerName: (state, action: PayloadAction<string>) => {
      state.ownerName = action.payload;
    },
    setRepoName: (state, action: PayloadAction<string>) => {
      state.repoName = action.payload;
    },
    setAllData: (state, action: PayloadAction<CardState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setOwnerName, setRepoName, setAllData } = cardSlice.actions;
