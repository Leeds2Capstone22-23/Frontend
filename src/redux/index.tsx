import { configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/exampleReducer';
import { labelDataReducer, labelStatusReducer } from './reducers/labelReducer';
import { docDataReducer, docStatusReducer } from './reducers/docReducer';
import {authDataReducer, authStatusReducer} from './reducers/authReducer'

// This is our main store
export const defaultStore = configureStore({
  reducer: {
    exampleReducer,
    labelDataReducer,
    labelStatusReducer,
    docDataReducer,
    docStatusReducer,
    authDataReducer,
    authStatusReducer,
  },
});

// Infer the RootState type from the store itself
// cause I'm lazy and this is easy
export type RootStore = ReturnType<typeof defaultStore.getState>;
