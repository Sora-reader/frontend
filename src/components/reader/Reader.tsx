import { createStyles, makeStyles } from '@material-ui/core';
import { useKeyboardScroll, useNextChapterLink } from '../pager/hooks';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters } from '../../api/types';
import { ReaderMode } from './types';
import { DefaultPager } from '../pager/DefaultPager';
import { WebtoonPager } from '../pager/WebtoonPager';
import { Dispatch, MouseEventHandler, SetStateAction, useMemo } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      padding: 'auto',
    },
  })
);
type Props = {
  manga: Manga;
  chapters: MangaChapters;
  chapter: MangaChapter;
  images: MangaChapterImages;
  mode: ReaderMode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  setHeaderImageNumber: Dispatch<SetStateAction<number>>;
};

export const Reader = ({ manga, chapters, chapter, images, mode, onClick, setHeaderImageNumber }: Props) => {
  const classes = useStyles();
  const mangaId = manga.id;
  useKeyboardScroll(images);
  const nextChapterLink = useNextChapterLink(manga, chapters, chapter);

  const pagerProps = useMemo(() => {
    return { mangaId, chapter, images, nextChapterLink, setHeaderImageNumber };
  }, [mangaId, chapter, images, nextChapterLink, setHeaderImageNumber]);

  return (
    <div className={classes.root} onClick={onClick}>
      {mode === 'default' ? <DefaultPager {...pagerProps} /> : <WebtoonPager {...pagerProps} />}
    </div>
  );
};

Reader.defaultProps = {
  mode: 'default',
};
