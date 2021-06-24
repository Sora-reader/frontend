import * as React from 'react';
import { useEffect } from 'react';
import { Box, createStyles, Divider, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MangaType } from '../catalogs/baseCatalog';
import { MangaDetailHeader } from '../components/manga/detail/MangaDetailHeader';
import { MangaDetailDescription } from '../components/manga/detail/MangaDetailDescription';
import { RootState } from '../redux/store';
import { SwipeableTabs } from '../components/SwipeableTabs';
import { pushLastVisitedManga } from '../redux/manga/actions';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function Detail() {
  const classes = useStyles();
  const router = useRouter();
  const manga: MangaType = useSelector((state: RootState) => state.manga.manga);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Manga data', manga);
    dispatch(pushLastVisitedManga(manga));
    if (!manga.title && !manga.link) {
      console.log('No data');
      router.push('/search');
    }
  }, []);

  // TODO
  // Pass props as a preview to manga (if from search)
  // Then fetch the details and chapterList

  const panels = [
    [
      'Описание',
      <Box key={1} p={2}>
        <MangaDetailHeader {...manga} />
        <Divider />
        <MangaDetailDescription text={String(manga.description)} />
      </Box>,
    ],
    [
      'Главы',
      <Box key={2} p={2}>
        Список глав
      </Box>,
    ],
  ] as Array<[String, JSX.Element]>;

  return (
    <div className={classes.root}>
      <SwipeableTabs panels={panels} />
    </div>
  );
}
