import { memo, useCallback, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from '../pager/utils';
import { useGetValidImageNumber } from '../pager/hooks';
import { PagerImage } from './PagerImage';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';
import { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const useStyles = makeStyles(() =>
  createStyles({
    imageRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

/**
 * Default pager component. Pages are changed by swiping Left/Right
 */
export const DefaultPager = memo(({ mangaId, chapter, nextChapterLink, setHeaderImageNumber }: PagerProps) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = useGetValidImageNumber(chapter.images);

  useEffect(() => {
    setHeaderImageNumber(currentImage + 1);
  }, [currentImage, setHeaderImageNumber]);

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
    [validImageNumber, chapter.images, currentImage, setCurrentImage]
  );

  return (
    <div>
      <BindKeyboardSwipeableViews hysteresis={0.5} threshold={20} index={currentImage} onChangeIndex={onChangeIndex}>
        {chapter.images.map((image, index) => {
          return (
            <PagerImage
              key={image}
              image={image}
              position={index}
              current={index === currentImage}
              classes={{ root: classes.imageRoot }}
              setHeaderImageNumber={setHeaderImageNumber}
            />
          );
        })}
      </BindKeyboardSwipeableViews>
      {currentImage === chapter.images.length - 1 ? (
        nextChapterLink ? (
          <GoNextButton nextUrl={nextChapterLink} setCurrentImage={setCurrentImage} />
        ) : (
          <GoNextButton nextUrl={`/detail/${mangaId}`} exit />
        )
      ) : null}
    </div>
  );
});
