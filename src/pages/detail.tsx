// @flow
import * as React from 'react';
import {Dispatch, useEffect} from 'react';
import {
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {MangaType} from '../catalogs/baseCatalog';
import {DetailHeader} from '../components/views/detail/DetailHeader';
import {DetailDescription} from '../components/views/detail/DetailDescription';
import {useSelector} from 'react-redux';
import {State} from '../redux/store';
import {useRouter} from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
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
        <IconButton onClick={() => router.push('/search')}>
          <ArrowBackIcon/>
        </IconButton>
        <DetailHeader {...manga}/>
        <Divider/>
        <DetailDescription text={String(manga.description)}/>
      </div>
  );
}