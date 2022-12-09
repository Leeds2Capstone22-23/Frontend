import { createAction, createReducer } from '@reduxjs/toolkit';
import {
    UserAuth,
    Status
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

export const authDataReducer = createReducer(
    blankUser, (builder) => {
  builder
    .addCase(saveAuth, (_, action) => action.payload)
    .addCase(clearAuth, () => {
        //Clear local storage?
        return blankUser
    });
});
