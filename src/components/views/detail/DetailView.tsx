// @flow
import * as React from 'react';
import {Dispatch} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {MangaType} from '../../../catalogs/baseCatalog';

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
        Манга {manga.title}
      </div>
  );
}