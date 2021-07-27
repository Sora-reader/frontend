import { memo, useCallback, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from '../pager/utils';
import { useGetValidImageNumber } from '../pager/hooks';
import { PagerImage } from './PagerImage';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';
import { useEffect } from 'react';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

/**
 * Default pager component. Pages are changed by swiping Left/Right
 */
export const DefaultPager = memo(
  ({ mangaId, chapter, nextChapterLink, setCurrentImage: setHeaderImage }: PagerProps) => {
    const [currentImage, setCurrentImage] = useState(0);
    const validImageNumber = useGetValidImageNumber(chapter.images);

    useEffect(() => {
      setHeaderImage(currentImage + 1);
    }, [currentImage, setHeaderImage]);

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
                setCurrentImage={setCurrentImage}
              />
            );
          })}
        </BindKeyboardSwipeableViews>
        {currentImage === chapter.images.length - 1 ? (
          nextChapterLink ? (
            <GoNextButton nextUrl={nextChapterLink} />
          ) : (
            <GoNextButton nextUrl={`/detail/${mangaId}`} exit />
          )
        ) : null}
      </div>
    );
  }
);
