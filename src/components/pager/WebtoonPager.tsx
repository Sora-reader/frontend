import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';
import { Manga } from '../../utils/apiTypes';
import { WebtoonImage } from './WebtoonImage';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

type Props = {
  manga: Manga;
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  nextChapterLink?: string;
};

export const WebtoonPager = ({ chapter }: Props) => {
  const classes = useStyles();

  return (
    <div>
      {chapter.images.map((image) => {
        return <WebtoonImage key={image} image={image} />;
      })}
    </div>
  );
};
