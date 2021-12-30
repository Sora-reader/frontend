import { WebtoonImage } from './WebtoonImage';
import { useScrolledBottom } from '../../common/hooks';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLoadImages } from './utils';
import { useSetReadOnCurrent } from './hooks';

/**
 * Webtoon pager. Append every other image to the bottom to form complete canvas
 */
export const WebtoonPager = memo(({ mangaId, chapter, images, nextChapterLink, setHeaderImageNumber }: PagerProps) => {
  const scrolledBottom = useScrolledBottom();
  const dispatch = useDispatch();
  const onCurrent = useSetReadOnCurrent(dispatch, mangaId, chapter);

  useLoadImages(images);

  return (
    <div>
      {images.map((image, index) => {
        return (
          <WebtoonImage
            key={image}
            image={image}
            position={index}
            onCurrent={onCurrent}
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
