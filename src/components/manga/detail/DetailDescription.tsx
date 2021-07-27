import { createStyles, Divider, Link, makeStyles, Theme, Typography } from '@material-ui/core';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../utils/apiTypes';
import { MangaRating } from '../MangaRating';
import { memo } from 'react';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      paddingTop: 0,
      width: '100%',
    },
    authors: {
      margin: 0,
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    genres: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    ratingContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: theme.spacing(1),
      '& > span': {
        alignItems: 'center',
        marginRight: theme.spacing(1),
      },
      '& p': {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.text.secondary,
      },
    },
    source: {},
    divider: { margin: `${theme.spacing(2)}px 0` },
  })
);

type Props = {
  manga: Manga;
};

export const DetailDescription = memo(({ manga }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {manga.authors?.length ? <h3 className={classes.authors}>{manga.authors?.join(', ')}</h3> : null}

      <ul className={classes.genres}>
        {manga.genres?.map((genre) => (
          <SoraChip key={genre} component="li" label={genre} />
        ))}
      </ul>

      {manga.rating ? (
        <div className={classes.ratingContainer}>
          <MangaRating value={manga.rating} />
          <p>
            {manga.rating}
            /5
          </p>
        </div>
      ) : null}

      <div>
        <Link className={classes.source} target="_blank" href={manga.sourceUrl}>
          {manga.source ? (
            <Typography variant="body1">Читать на {manga.source}</Typography>
          ) : (
            <Skeleton>
              <Typography variant="body1">Читать на SomeSource</Typography>
            </Skeleton>
          )}
        </Link>
      </div>

      <Divider className={classes.divider} />

      <Typography>{manga.description}</Typography>
    </div>
  );
});
