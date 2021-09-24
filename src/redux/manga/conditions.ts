import { Condition } from '../types';

export const mangaDidNotChange: Condition<Number> = (id, { getState }) => {
  const {
    manga: { current },
  } = getState();
  return Boolean((current && current.id === id) || !current);
};

export const chapterDidNotChange: Condition<Number> = (id, { getState }) => {
  const {
    manga: { chapter },
  } = getState();
  if (chapter) return chapter.id === id;
};
