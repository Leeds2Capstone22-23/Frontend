import { configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/exampleReducer';
import { labelDataReducer, labelStatusReducer } from './reducers/labelReducer';

// This is our main store
export const defaultStore = configureStore({
  reducer: {
    exampleReducer,
    labelDataReducer,
    labelStatusReducer,
  },
});

// Infer the RootState type from the store itself
// cause I'm lazy and this is easy
export type RootStore = ReturnType<typeof defaultStore.getState>;
