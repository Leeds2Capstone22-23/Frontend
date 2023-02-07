import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/exampleReducer';
import { labelDataReducer, labelStatusReducer } from './reducers/labelReducer';
import { docDataReducer, docStatusReducer } from './reducers/docReducer';
import { snippetDataReducer, snippetStatusReducer } from './reducers/snippetReducer';
import { authDataReducer, authStatusReducer } from './reducers/authReducer';

// This is our main store

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  exampleReducer,
  labelDataReducer,
  labelStatusReducer,
  docDataReducer,
  docStatusReducer,
  authDataReducer,
  authStatusReducer,
  snippetDataReducer,
  snippetStatusReducer,
});

export const logoutAction = createAction('Logout');
export const rootReducer = (state, action) => {
  if (action.type === 'Logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export const defaultStore = configureStore({
  reducer: {
    rootReducer,
  },
});

// Infer the RootState type from the store itself
// cause I'm lazy and this is easy
export type RootStore = ReturnType<typeof defaultStore.getState>;
