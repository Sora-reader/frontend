import * as React from 'react';
import { useCallback } from 'react';
import { createStyles, ListItem, ListItemAvatar, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { MangaType } from '../../../catalogs/baseCatalog';
import { SearchItemDesc } from './SearchItemDesc';
import { CustomAvatar } from '../../muiCustoms/CustomAvatar';
import { setManga } from '../../../redux/manga/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

type Props = {
  data: MangaType;
};

export function SearchItem(props: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { data } = props;
  const dispatch = useDispatch();
  const passManga = useCallback(() => {
    dispatch(setManga(data));
    router.push('/detail').then();
  }, [router, data, setManga]);

  return (
    <ListItem button onClick={passManga} key={data.link} alignItems="flex-start" className={classes.root}>
      <ListItemAvatar className={classes.avatarWrapper}>
        <CustomAvatar src={data.imageUrl} className={classes.avatar} />
      </ListItemAvatar>
      <SearchItemDesc {...data} />
    </ListItem>
  );
}
