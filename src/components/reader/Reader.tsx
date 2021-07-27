import { createStyles, makeStyles } from '@material-ui/core';
import { useKeyboardScroll, useNextChapterLink } from '../pager/hooks';
import { Manga } from '../../utils/apiTypes';
import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';
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
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  mode: ReaderMode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  setCurrentImage: Dispatch<SetStateAction<number>>;
};

export const Reader = ({ manga, chapter, mode, onClick, setCurrentImage }: Props) => {
  const classes = useStyles();
  const mangaId = manga.id;
  useKeyboardScroll(chapter.images);
  const nextChapterLink = useNextChapterLink(manga, chapter);

  const pagerProps = useMemo(() => {
    return { mangaId, chapter, nextChapterLink, setCurrentImage };
  }, [mangaId, chapter, nextChapterLink, setCurrentImage]);

  return (
    <div className={classes.root} onClick={onClick}>
      {mode === 'default' ? <DefaultPager {...pagerProps} /> : <WebtoonPager {...pagerProps} />}
    </div>
  );
};

Reader.defaultProps = {
  mode: 'default',
};
