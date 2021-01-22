// @flow
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
})));

type Props = {}

export function DetailView(props: Props) {
  const classes = useStyles();

  // Pass props as a preview to manga (if from search)
  // Then fetch the details and chapterList
  // const [chapterList, setChapterList] = useState({} as ChapterListType);

  return (
      <div className={classes.root}>
        Манга
      </div>
  );
}