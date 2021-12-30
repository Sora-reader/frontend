import { createStyles, ListItemText, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../api/types';
import { MangaRating } from '../MangaRating';
import { memo } from 'react';
import { useMemo } from 'react';
import { isNotEmpty } from '../../../common/utils';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        paddingTop: 0,
      },
    },
    footer: {},
    title: {
      marginTop: 0,
    },
    authors: {
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
  })
);

export const MangaListItemDesc = memo((manga: Manga | {}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const titleVariant = useMemo(() => {
    return smallDevice ? 'h5' : 'h4';
  }, [smallDevice]);

  return (
    <div className={classes.root}>
      <ListItemText className={classes.title}>
        {isNotEmpty<Manga>(manga) ? (
          <Typography variant={titleVariant}>{manga.title}</Typography>
        ) : (
          <Skeleton width="100%">
            <Typography variant={titleVariant}>.</Typography>
          </Skeleton>
        )}
      </ListItemText>

      {isNotEmpty<Manga>(manga) ? (
        <>
          <MangaRating value={manga.rating} />
          <div className={classes.footer}>
            <ul className={classes.genres}>
              {manga.genres?.map((genre) => (
                <SoraChip key={genre} component="li" label={genre} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
});
