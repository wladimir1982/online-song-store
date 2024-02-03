import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { singerApi } from 'services/SingerService';
import { singersApi } from 'services/SingersService';

import favoritesReducer from './reducers/Favorites';

const rootReducer = combineReducers({
  favoritesReducer,
  [singersApi.reducerPath]: singersApi.reducer,
  [singerApi.reducerPath]: singerApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(singersApi.middleware, singerApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
