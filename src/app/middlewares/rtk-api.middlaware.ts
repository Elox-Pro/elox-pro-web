import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from "@reduxjs/toolkit";
import { setOverlay } from '../../common/features/common.slice';
import { setError } from '../../errors/features/error.slice';
import { parseErrorResponse } from '../../errors/helpers/parse-error-response';

/**
 * Redux middleware to handle RTK Query actions and manage error and loading states.
 *
 * @param {MiddlewareAPI} api - The Redux middleware API object.
 * @returns {Function} A middleware function that handles RTK Query actions.
 */
export const rtkQueryMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
  const { dispatch } = api;

  // Handle rejected actions (API errors)
  if (isRejectedWithValue(action)) {
    console.error('Error:', action.payload);
    dispatch(setOverlay(false)); // Hide loading overlay
    dispatch(setError(parseErrorResponse(action.payload))); // Set error state
  }

  // Handle pending actions (API requests in progress)
  if (action.type.endsWith('/pending')) {
    dispatch(setOverlay(true)); // Show loading overlay
  }

  // Handle fulfilled actions (API requests completed successfully)
  if (action.type.endsWith('/fulfilled')) {
    dispatch(setOverlay(false)); // Hide loading overlay
  }

  // Pass the action to the next middleware
  return next(action);
};