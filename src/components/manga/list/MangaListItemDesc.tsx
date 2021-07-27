import { createStyles, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../utils/apiTypes';
import { MangaRating } from '../MangaRating';
import { memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1),
    },
    footer: {},
    title: {
      marginTop: 0,
      '& span': {
        fontSize: 'xx-large',
        lineHeight: '2rem',
      },
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

export const MangaListItemDesc = memo((manga: Manga) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItemText className={classes.title}>
        <Typography variant="h4">{manga.title}</Typography>
      </ListItemText>

      <MangaRating value={manga.rating} />
      <div className={classes.footer}>
        <ul className={classes.genres}>
          {manga.genres?.map((genre) => (
            <SoraChip key={genre} component="li" label={genre} />
          ))}
        </ul>
      </div>
    </div>
  );
});
