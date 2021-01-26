// @flow
import * as React from 'react';
import {Dispatch} from 'react';
import {createStyles, Divider, makeStyles, Theme} from '@material-ui/core';
import {MangaType} from '../../../catalogs/baseCatalog';
import {DetailHeader} from './DetailHeader';
import {DetailDescription} from './DetailDescription';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
})));

type Props = {
  manga: MangaType,
  setManga: Dispatch<any>,
}

export function DetailView(props: Props) {
  const classes = useStyles();

  const {manga} = props;

  // Pass props as a preview to manga (if from search)
  // Then fetch the details and chapterList
  // const {setManga} = props;
  // const [chapterList, setChapterList] = useState({} as ChapterListType);

  return (
      <div className={classes.root}>
        <DetailHeader {...manga}/>
        <Divider/>
        <DetailDescription text={String(manga.description)}/>
      </div>
  );
}