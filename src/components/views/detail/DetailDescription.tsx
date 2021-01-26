// @flow
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
})));

type Props = {};

export function DetailDescription(props: Props) {
  const classes = useStyles();

  return (
      <div className={classes.root}>

      </div>
  );
}