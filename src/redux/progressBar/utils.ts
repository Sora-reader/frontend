import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useNeedSpinner = () => {
  const progressBarTasks = useSelector((state: RootState) => state.progressBar);
  return useMemo(() => Boolean(progressBarTasks.length), [progressBarTasks]);
};
