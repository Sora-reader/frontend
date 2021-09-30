import { createAction } from '@reduxjs/toolkit';
import { AppError } from './types';

export const addError = createAction<Omit<AppError, 'id'>>('errors/addError');
export const dismissError = createAction<number>('errors/dismissError');
