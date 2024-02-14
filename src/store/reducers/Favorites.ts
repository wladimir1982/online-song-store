import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISong } from 'interfaces/interfaces';

interface Favorites {
  songs: ISong[];
}

const initialState: Favorites = {
  songs: []
};

const savedState = localStorage.getItem('favorites');

if (savedState) {
  initialState.songs = JSON.parse(savedState).songs;
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addSongToFavorite(state, action: PayloadAction<ISong>) {
      state.songs.push(action.payload);
      saveStateToLocalStorage(state);
    },
    removeSongFromFavorite(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      saveStateToLocalStorage(state);
    }
  }
});

export const { addSongToFavorite, removeSongFromFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

function saveStateToLocalStorage(state: Favorites) {
  localStorage.setItem('favorites', JSON.stringify(state));
}
