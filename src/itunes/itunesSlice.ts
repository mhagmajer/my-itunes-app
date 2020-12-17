import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../store';
import type { Ebook } from './itunesSaga';

export type ITunesState = {
  ebooks: Ebook[];
};

const itunesSlice = createSlice({
  name: 'itunes',
  initialState: {
    ebooks: [],
  } as ITunesState,
  reducers: {
    searchEbooks(state, action: PayloadAction<{ searchTerm: string }>) {
      // side effects
    },
    loadedEbooks(state, action: PayloadAction<Ebook[]>) {
      state.ebooks = action.payload;
    },
    searchEbooksTyping(state, action: PayloadAction<{ searchTerm: string }>) {
      // side effects
    },
  },
});

export const {
  searchEbooks,
  loadedEbooks,
  searchEbooksTyping,
} = itunesSlice.actions;

export const selectEbooks = (state: StoreState) => state.itunes.ebooks;

export const itunesReducer = itunesSlice.reducer;
