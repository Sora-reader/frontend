// @flow
import * as React from 'react';
import {Dispatch, useCallback} from 'react';
import {
  createStyles,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {MangaType} from '../../../catalogs/baseCatalog';
import {SearchItemDesc} from './SearchItemDesc';
import {useRouter} from 'next/router';
import {CustomAvatar} from '../../muiCustoms/CustomAvatar';

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
  data: MangaType,
  setManga: Dispatch<any>
}

export function SearchItem(props: Props) {
  const classes = useStyles();
  const router = useRouter();
  const {data, setManga} = props;

  const passManga = useCallback(() => {
    setManga(data);
    router.push('/manga').then();
  }, [router, data, setManga]);

  return (
      <ListItem button
                onClick={passManga}
                key={data.link}
                alignItems={'flex-start'}
                className={classes.root}
      >
        <ListItemAvatar className={classes.avatarWrapper}>
          <CustomAvatar src={data.imageUrl}
                        className={classes.avatar}/>
        </ListItemAvatar>
        <SearchItemDesc {...data}/>
      </ListItem>
  );
}