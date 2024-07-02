import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from 'store/search/searchSlice.ts';
import { cardSlice } from 'store/card/cardSlice.ts';

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    card: cardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
