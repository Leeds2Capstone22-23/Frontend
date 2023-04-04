import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
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

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
};

export const logoutAction = createAction('Logout');

const reducer = (state, action) => {
  if (action.type === 'Logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const rootReducer = persistReducer(persistConfig, reducer);

export const defaultStore = configureStore({
  reducer: {
    rootReducer,
  },
});

export const persistor = persistStore(defaultStore);

// Infer the RootState type from the store itself
// cause I'm lazy and this is easy
export type RootStore = ReturnType<typeof defaultStore.getState>;
