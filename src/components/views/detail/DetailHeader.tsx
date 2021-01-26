// @flow
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {MangaType} from '../../../catalogs/baseCatalog';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
})));

type Props = MangaType;

export function DetailHeader(props: Props) {
  const classes = useStyles();

  return (
      <div className={classes.root}>

      </div>
  );
}