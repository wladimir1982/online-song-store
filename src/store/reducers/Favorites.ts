import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISong } from 'interfaces/interfaces';

interface Favorites {
  songs: ISong[];
}

const initialState: Favorites = {
  songs: []
};

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addSongToFavorite(state, action: PayloadAction<ISong>) {
      state.songs.push(action.payload);
    },
    removeSongFromFavorite(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    }
  }
});

export default favorites.reducer;
