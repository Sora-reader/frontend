import { useCallback } from 'react';
import { createStyles, ListItem, ListItemAvatar, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { MangaListItemDesc } from './MangaListItemDesc';
import { MangaImage } from '../MangaImage';
import { Manga } from '../../../api/types';
import { memo } from 'react';
import { mangaListImageSize } from '../../../core/consts';
import { navigateToDetail } from '../../../common/router';
import { isNotEmpty } from '../../../common/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '8rem',
    },
    avatarWrapper: {
      margin: 0,
    },
    avatar: {
      height: mangaListImageSize.height,
      width: mangaListImageSize.width,
    },
  })
);

export const MangaListItem = memo((manga: Manga | {}) => {
  const classes = useStyles();
  const router = useRouter();

  const passManga = useCallback(() => {
    if (isNotEmpty<Manga>(manga)) {
      navigateToDetail(router, manga.id);
    }
  }, [router, manga]);

  return (
    <ListItem button onClick={passManga} alignItems="flex-start" className={classes.root}>
      <ListItemAvatar className={classes.avatarWrapper}>
        <MangaImage src={isNotEmpty<Manga>(manga) ? manga.thumbnail : undefined} className={classes.avatar} />
      </ListItemAvatar>
      <MangaListItemDesc {...(manga || {})} />
    </ListItem>
  );
});
