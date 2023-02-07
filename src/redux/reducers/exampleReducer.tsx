import { createAction, createReducer } from '@reduxjs/toolkit';

/**
 * EXAMPLE REDUCER + ACTIONS
 */
export const exampleAction = createAction('reducer/function');

export const exampleReducer = createReducer(false, (builder) => {
  builder
    .addCase(exampleAction, () => true);
});
