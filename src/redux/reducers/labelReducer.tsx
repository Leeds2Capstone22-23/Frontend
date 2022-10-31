import { createAction, createReducer } from '@reduxjs/toolkit';
import {
    Label,
    Status
} from '../../types/types';

/**
 * STATUS
 */
export const labelSuccess = createAction('labels/status/success');
export const labelFailed = createAction('labels/status/failed');
export const labelLoading = createAction('labels/status/loading');
export const labelInitial = createAction('labels/status/initial');

export const labelStatusReducer = createReducer(Status.Initial, (builder) => {
  builder
    .addCase(labelInitial, () => Status.Initial)
    .addCase(labelSuccess, () => Status.Succeeded)
    .addCase(labelFailed, () => Status.Failed)
    .addCase(labelLoading, () => Status.Loading);
});

/**
 * DATA
 */
export const saveLabels = createAction<Label[]>('labels/data/save');
export const clearLabels = createAction('labels/data/clear');

export const labelDataReducer = createReducer([] as Label[], (builder) => {
  builder
    .addCase(saveLabels, (_, action) => action.payload)
    .addCase(clearLabels, () => []);
});
