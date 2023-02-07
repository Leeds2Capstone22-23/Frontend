import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  Snippet,
  Status,
} from '../../types/types';

/**
 * STATUS
 */
export const snippetSuccess = createAction('snippets/status/success');
export const snippetFailed = createAction('snippets/status/failed');
export const snippetLoading = createAction('snippets/status/loading');
export const snippetInitial = createAction('snippets/status/initial');

export const snippetStatusReducer = createReducer(Status.Initial, (builder) => {
  builder
    .addCase(snippetInitial, () => Status.Initial)
    .addCase(snippetSuccess, () => Status.Succeeded)
    .addCase(snippetFailed, () => Status.Failed)
    .addCase(snippetLoading, () => Status.Loading);
});

/**
 * DATA
 */
export const saveSnippets = createAction<Snippet[]>('snippets/data/save');
export const clearSnippets = createAction('snippets/data/clear');

export const snippetDataReducer = createReducer([] as Snippet[], (builder) => {
  builder
    .addCase(saveSnippets, (_, action) => action.payload)
    .addCase(clearSnippets, () => []);
});
