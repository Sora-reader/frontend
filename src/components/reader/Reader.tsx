import { useCallback, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useKeyboardScroll } from '../../utils/reader/scrollHandler';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from './utils';
import { useGetValidImageNumber, useNextChapterLink, useUserScalable } from './hooks';
import { ReaderImage } from './ReaderImage';
import { Manga } from '../../utils/apiTypes';
import { CurrentChapter } from '../../redux/manga/reducer';
import { ReaderMode } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      padding: 'auto',
    },
  })
);

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type Props = {
  manga: Manga;
  chapter: CurrentChapter;
  mode: ReaderMode; // TODO: add different pagers
};

export const Reader = ({ manga, chapter, mode }: Props) => {
  console.log(mode);
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = useGetValidImageNumber(chapter.images);

  useUserScalable();
  useKeyboardScroll(chapter.images);
  const nextChapterLink = useNextChapterLink(manga, chapter);

  const onChangeIndex = useCallback(
    (newIndex, prevIndex) => {
      if (!chapter.images || Math.abs(prevIndex - newIndex) === chapter.images.length - 1) return;
      const diff = roundBinary(newIndex - prevIndex);
      const newNumber = validImageNumber(currentImage + diff);
      console.log(currentImage + diff);
      console.log(chapter.images.length, nextChapterLink);
      if (newNumber !== undefined) {
        setCurrentImage(newNumber);
        window.scroll({ top: 0 });
      }
    },
    [chapter.images, currentImage, setCurrentImage]
  );

  return (
    <div className={classes.root}>
      {chapter.images ? (
        <BindKeyboardSwipeableViews hysteresis={0.5} threshold={20} index={currentImage} onChangeIndex={onChangeIndex}>
          {chapter.images.map((image, index) => {
            return <ReaderImage key={image} image={image} current={index === currentImage} />;
          })}
        </BindKeyboardSwipeableViews>
      ) : (
        ''
      )}
    </div>
  );
};

Reader.defaultProps = {
  mode: 'default',
};
