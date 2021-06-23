import * as React from 'react';
import { createStyles, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { MangaType } from '../../../catalogs/baseCatalog';
import { GenreChip } from '../GenreChip';
import { MangaRating } from '../MangaRating';

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

type Props = MangaType;

export function MangaListItemDesc(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ListItemText className={classes.title}>{props.title}</ListItemText>
        <MangaRating value={props.starRate} />
      </div>

      <div className={classes.footer}>
        <ListItemText className={classes.author}>{props.author}</ListItemText>
        <ul className={classes.genres}>
          {props.genres?.map((genre) => (
            // @ts-ignore
            <GenreChip component="li" label={genre} key={genre} />
          ))}
        </ul>
      </div>
    </div>
  );
}