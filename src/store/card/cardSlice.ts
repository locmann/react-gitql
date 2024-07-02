import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  name: string;
  stars: number;
  lastCommitDate: string;
  photoUrl: string;
  ownerName: string;
  languages: string[];
  description: string;
}

const initialState = {
  ownerName: '',
  repoName: '',
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
  },
});

export const { setOwnerName, setRepoName } = cardSlice.actions;
