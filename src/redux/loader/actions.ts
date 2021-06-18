import { createAction } from '@reduxjs/toolkit';
import { LoadingTask } from './types';

export const startLoading = createAction<LoadingTask>('loader/startLoading');
export const endLoading = createAction<LoadingTask>('loader/endLoading');
