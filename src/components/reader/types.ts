import { Dispatch, SetStateAction } from 'react';
import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';

export type PagerProps = {
  mangaId: number;
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  nextChapterLink?: string;
  setHeaderImageNumber: Dispatch<SetStateAction<number>>;
};
export type ReaderMode = 'default' | 'webtoon';
