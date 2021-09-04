import { WebtoonImage } from './WebtoonImage';
import { useScrolledBottom } from '../../utils/hooks';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';
import { memo } from 'react';
import { setReadIfNeeded } from './utils';
import { useDispatch } from 'react-redux';

/**
 * Webtoon pager. Append every other image to the bottom to form complete canvas
 */
export const WebtoonPager = memo(({ mangaId, chapter, nextChapterLink, setHeaderImageNumber }: PagerProps) => {
  const scrolledBottom = useScrolledBottom();
  const dispatch = useDispatch();

  return (
    <div>
      {chapter.images.map((image, index) => {
        return (
          <WebtoonImage
            key={image}
            image={image}
            position={index}
            onCurrent={setReadIfNeeded(dispatch, mangaId, chapter)}
            setHeaderImageNumber={setHeaderImageNumber}
          />
        );
      })}
      {scrolledBottom ? (
        nextChapterLink ? (
          <GoNextButton nextUrl={nextChapterLink} setCurrentImage={setHeaderImageNumber} />
        ) : (
          <GoNextButton nextUrl={`/detail/${mangaId}`} exit />
        )
      ) : null}
    </div>
  );
});
