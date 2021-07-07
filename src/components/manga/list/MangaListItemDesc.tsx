import { createStyles, ListItemText, makeStyles, Theme } from '@material-ui/core';
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
    header: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
    footer: {},
    title: {
      marginTop: 0,
      '& span': {
        fontSize: 'xx-large',
        lineHeight: '2rem',
      },
    },
    author: {
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
  })
);

export const MangaListItemDesc = memo((manga: Manga) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ListItemText className={classes.title}>{manga.title}</ListItemText>
        <MangaRating value={manga.rating} />
      </div>

      <div className={classes.footer}>
        <ListItemText className={classes.author}>{manga.authors?.join(', ')}</ListItemText>
        <ul className={classes.genres}>
          {manga.genres?.map((genre) => (
            <SoraChip component="li" label={genre} key={genre} />
          ))}
        </ul>
      </div>
    </div>
  );
});
