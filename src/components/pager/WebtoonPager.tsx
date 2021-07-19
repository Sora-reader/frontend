import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';
import { Manga } from '../../utils/apiTypes';
import { WebtoonImage } from './WebtoonImage';
import { useScrolledBottom } from '../../utils/hooks';
import { GoNextButton } from '../reader/GoNextButton';

type Props = {
  manga: Manga;
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  nextChapterLink?: string;
};

export const WebtoonPager = ({ manga, chapter, nextChapterLink }: Props) => {
  const scrolledBottom = useScrolledBottom();

  return (
    <div>
      {chapter.images.map((image) => {
        return <WebtoonImage key={image} image={image} />;
      })}
      {scrolledBottom ? (
        nextChapterLink ? (
          <GoNextButton nextUrl={nextChapterLink} />
        ) : (
          <GoNextButton nextUrl={`/detail/${manga.id}`} exit />
        )
      ) : null}
    </div>
  );
};
