// import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import themaReducer from "./features/thema/thema-slice";
import authReducer from "./features/auth/auth-slice";
import localeReducer from "./features/locale/locale-slice";
import profileReducer from "./features/profile/profile-slice";

// Persist configuration
const basePersistConfig = {
  version: 1,
  storage,
};

const persistConfigThema = { ...basePersistConfig, key: "thema" };
const persistConfigAuth = { ...basePersistConfig, key: "auth" };
const persistConfigLocale = { ...basePersistConfig, key: "locale" };
const persistConfigProfile = { ...basePersistConfig, key: "profile" };

// Create persisted reducers
const persistedReducerThema = persistReducer(persistConfigThema, themaReducer);
const persistedReducerAuth = persistReducer(persistConfigAuth, authReducer);
const persistedReducerProfile = persistReducer(
  persistConfigProfile,
  profileReducer,
);
const persistedReducerLocale = persistReducer(
  persistConfigLocale,
  localeReducer,
);

const store = configureStore({
  reducer: {
    thema: persistedReducerThema,
    auth: persistedReducerAuth,
    locale: persistedReducerLocale,
    profile: persistedReducerProfile,
  },

  middleware: (
    getDefaultMiddleware,
    // : any, // eslint-disable-line
  ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
