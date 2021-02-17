// @flow
import * as React from 'react';
import {Dispatch} from 'react';
import {createStyles, Divider, makeStyles, Theme} from '@material-ui/core';
import {MangaType} from '../catalogs/baseCatalog';
import {DetailHeader} from '../components/views/detail/DetailHeader';
import {DetailDescription} from '../components/views/detail/DetailDescription';
import {useSelector} from 'react-redux';
import {State} from '../redux/store';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
})));

export default function Detail() {
  const classes = useStyles();

  const {manga} = useSelector((state: State) => state.manga);

  console.log('Manga data', manga);
  // TODO
  // Pass props as a preview to manga (if from search)
  // Then fetch the details and chapterList

  return (
      <div className={classes.root}>
        <DetailHeader {...manga}/>
        <Divider/>
        <DetailDescription text={String(manga.description)}/>
      </div>
  );
}