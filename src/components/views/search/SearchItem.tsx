// @flow
import * as React from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {MangaType} from '../../../catalogs/baseCatalog';
import {SearchItemDesc} from './SearchItemDesc';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '8rem',
  },
  avatarWrapper: {
    height: '100%',
    width: '15%',
    margin: 0,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
})));

type Props = {
  manga: MangaType,
}

export function SearchItem(props: Props) {
  const classes = useStyles();
  const {manga} = props;

  return (
      <ListItem button
                key={manga.link}
                alignItems={'flex-start'}
                className={classes.root}
      >
        <ListItemAvatar className={classes.avatarWrapper}>
          <Avatar variant={'rounded'}
                  src={manga.imageUrl}
                  className={classes.avatar}/>
        </ListItemAvatar>
        <SearchItemDesc {...manga}/>
      </ListItem>
  );
}