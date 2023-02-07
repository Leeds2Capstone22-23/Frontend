import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  Doc,
  Status,
} from '../../types/types';

/**
 * STATUS
 */
export const docSuccess = createAction('docs/status/success');
export const docFailed = createAction('docs/status/failed');
export const docLoading = createAction('docs/status/loading');
export const docInitial = createAction('docs/status/initial');

export const docStatusReducer = createReducer(Status.Initial, (builder) => {
  builder
    .addCase(docInitial, () => Status.Initial)
    .addCase(docSuccess, () => Status.Succeeded)
    .addCase(docFailed, () => Status.Failed)
    .addCase(docLoading, () => Status.Loading);
});

/**
 * DATA
 */
export const saveDocs = createAction<Doc[]>('docs/data/save');
export const clearDocs = createAction('docs/data/clear');

export const docDataReducer = createReducer([] as Doc[], (builder) => {
  builder
    .addCase(saveDocs, (_, action) => action.payload)
    .addCase(clearDocs, () => []);
});
