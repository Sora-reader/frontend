import { useCallback, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from '../pager/utils';
import { useGetValidImageNumber } from '../pager/hooks';
import { ReaderImage } from '../reader/ReaderImage';
import { Manga } from '../../utils/apiTypes';
import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';

const useStyles = makeStyles(() => createStyles({}));

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

type Props = {
  manga: Manga;
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  nextChapterLink?: string;
};

export const DefaultPager = ({ manga, chapter }: Props) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = useGetValidImageNumber(chapter.images);

  const onChangeIndex = useCallback(
    (newIndex, prevIndex) => {
      if (Math.abs(prevIndex - newIndex) === chapter.images.length - 1) return;
      const diff = roundBinary(newIndex - prevIndex);
      const newNumber = validImageNumber(currentImage + diff);

      if (newNumber !== undefined) {
        setCurrentImage(newNumber);
        window.scroll({ top: 0 });
      }
    },
    [chapter.images, currentImage, setCurrentImage]
  );

  return (
    <div>
      <BindKeyboardSwipeableViews hysteresis={0.5} threshold={20} index={currentImage} onChangeIndex={onChangeIndex}>
        {chapter.images.map((image, index) => {
          return <ReaderImage key={image} image={image} current={index === currentImage} />;
        })}
      </BindKeyboardSwipeableViews>
    </div>
  );
};
