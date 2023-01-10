import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  UserAuth,
  Status,
} from '../../types/types';

/**
 * STATUS
 */
export const authSuccess = createAction('auth/status/success');
export const authFailed = createAction('auth/status/failed');
export const authLoading = createAction('auth/status/loading');
export const authInitial = createAction('auth/status/initial');

export const authStatusReducer = createReducer(Status.Initial, (builder) => {
  builder
    .addCase(authInitial, () => Status.Initial)
    .addCase(authSuccess, () => Status.Succeeded)
    .addCase(authFailed, () => Status.Failed)
    .addCase(authLoading, () => Status.Loading);
});

/**
 * DATA
 */
export const saveAuth = createAction<UserAuth>('auth/data/save');
export const clearAuth = createAction('auth/data/clear');

const blankUser = {
  userSecret: '',
  username: '',
  fullName: '',
  userId: -1,
} as UserAuth;

export const authDataReducer = createReducer(blankUser, (builder) => {
  builder
    .addCase(saveAuth, (_, action) => {
      const date = new Date();
      // Add seven days to current date
      date.setDate(date.getDate() + 7);
      // eslint-disable-next-line max-len
      document.cookie = `username=${action.payload.username}, secret=${action.payload.userSecret};expires=${date.toUTCString()};path=/;`;
      return action.payload;
    })
    .addCase(clearAuth, () => {
      const date = new Date();
      date.setDate(0);
      document.cookie = `username=, secret=;expires=${date.toUTCString()};path=/;`;
      return blankUser;
    });
});
