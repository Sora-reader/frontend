import { createStyles, makeStyles } from '@material-ui/core';
import { Manga } from '../../../common/apiTypes';
import { DetailHeader } from './DetailHeader';
import { DetailDescription } from './DetailDescription';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type Props = {
  manga: Manga;
};

export function MangaDetail({ manga }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DetailHeader image={manga.image} title={manga.title} altTitle={manga.altTitle} />
      <DetailDescription manga={manga} />
    </div>
  );
}
