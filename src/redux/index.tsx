import { configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/exampleReducer';

// This is our main store
export const defaultStore = configureStore({
  reducer: {
    exampleReducer
  },
});

// Infer the RootState type from the store itself
// cause I'm lazy and this is easy
export type RootStore = ReturnType<typeof defaultStore.getState>;
