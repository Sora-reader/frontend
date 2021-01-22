// @flow
import * as React from 'react';
import {
  createStyles,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import {MangaType} from '../../../catalogs/baseCatalog';

const useStyles = makeStyles((theme: Theme) => createStyles(({
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
    '& span': {
      fontSize: 'x-large',
    },
  },
  author: {
    color: theme.palette.grey.A100,
  },
  rating: {},
  genres: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  genre: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    borderRadius: 5,
    backgroundColor: theme.palette.primary.dark,
  },
})));

export function SearchItemDesc(props: MangaType) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <div className={classes.header}>
          <ListItemText className={classes.title}>
            {props.title}
          </ListItemText>
          <Rating readOnly
                  precision={0.1}
                  className={classes.rating}
                  value={props.starRate ? props.starRate / 2 : 0}
          />
        </div>

        <div className={classes.footer}>
          <ListItemText className={classes.author}>
            {props.author}
          </ListItemText>
          <ListItemText disableTypography classes={{root: classes.genres}}>
            {props.genres?.map(genre => {
              return (
                  <span key={genre} className={classes.genre}>
                            {genre}
                  </span>
              );
            })}
          </ListItemText>
        </div>
      </div>
  );
}