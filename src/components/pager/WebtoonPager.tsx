import { WebtoonImage } from './WebtoonImage';
import { useScrolledBottom } from '../../utils/hooks';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';
import { memo } from 'react';

/**
 * Webtoon pager. Append every other image to the bottom to form complete canvas
 */
export const WebtoonPager = memo(({ mangaId, chapter, nextChapterLink, setHeaderImageNumber }: PagerProps) => {
  const scrolledBottom = useScrolledBottom();

  return (
    <div>
      {chapter.images.map((image, index) => {
        return <WebtoonImage key={image} image={image} position={index} setHeaderImageNumber={setHeaderImageNumber} />;
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
