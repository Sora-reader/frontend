import * as React from 'react';
import {useEffect} from 'react';
import {
  Box,
  createStyles,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {MangaType} from '../catalogs/baseCatalog';
import {DetailHeader} from '../components/views/detail/DetailHeader';
import {DetailDescription} from '../components/views/detail/DetailDescription';
import {useSelector} from 'react-redux';
import {State} from '../redux/store';
import {useRouter} from 'next/router';
import {SwipeableTabs} from '../components/SwipableTabs';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {},
})));

export default function Detail() {
  const classes = useStyles();
  const router = useRouter();
  const manga: MangaType = useSelector((state: State) => state.manga.manga);

  useEffect(() => {
    console.log('Manga data', manga);
    if (!manga.title && !manga.link) {
      console.log('No data');
      router.push('/search').then(null);
    }
  }, []);

  // TODO
  // Pass props as a preview to manga (if from search)
  // Then fetch the details and chapterList

  return (
      <div className={classes.root}>
        <SwipeableTabs
            panels={{
              'Описание': <Box p={2}>
                <DetailHeader {...manga}/>
                <Divider/>
                <DetailDescription text={String(manga.description)}/>
              </Box>,
              'Главы': <Box p={2}>
                Список глав
              </Box>,
            }}/>
      </div>
  );
}