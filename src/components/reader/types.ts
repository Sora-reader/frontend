import { Dispatch, SetStateAction } from 'react';
import { MangaChapter, MangaChapterImages } from '../../api/types';

export type PagerProps = {
  mangaId: number;
  chapter: MangaChapter;
  images: MangaChapterImages;
  nextChapterLink?: string;
  setHeaderImageNumber: Dispatch<SetStateAction<number>>;
};
export type ReaderMode = 'default' | 'webtoon';
