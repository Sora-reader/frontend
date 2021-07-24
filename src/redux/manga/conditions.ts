import { Condition } from '../types';

export const mangaDidNotChange: Condition<Number> = (id, { getState }) => {
  const {
    manga: { current },
  } = getState();
  return current.id === id;
};

export const chapterDidNotChange: Condition<Number> = (id, { getState }) => {
  const {
    manga: { chapter },
  } = getState();
  if (chapter) return chapter.id === id;
};
