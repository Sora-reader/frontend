import { createAction } from '@reduxjs/toolkit';
import { LoadingTask } from './types';

export const startLoading = createAction<LoadingTask>('progressBar/startLoading');
export const endLoading = createAction<LoadingTask>('progressBar/endLoading');
