import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
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
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.languages = action.payload;
    },
    setLastCommitDate: (state, action: PayloadAction<string>) => {
      state.lastCommitDate = action.payload;
    },
    setPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
    setStars: (state, action: PayloadAction<number>) => {
      state.stars = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const {
  setOwnerName,
  setRepoName,
  setDescription,
  setLastCommitDate,
  setStars,
  setPhotoUrl,
  setLanguages,
  setUrl,
} = cardSlice.actions;
