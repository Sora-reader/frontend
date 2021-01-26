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
import {CustomChip} from '../../muiCustoms/CustomChip';

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
  rating: {},
  genres: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
})));

type Props = MangaType;

export function SearchItemDesc(props: Props) {
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
          <ul className={classes.genres}>
            {props.genres?.map((genre) => {
              return <CustomChip component={'li'} label={genre} key={genre}/>;
            })}
          </ul>
        </div>
      </div>
  );
}