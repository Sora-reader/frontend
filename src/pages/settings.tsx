// @flow
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  sidebar: {},
  content: {},
}));

export default function Settings() {
  const classes = useStyles();

  return (
      <div className={classes.root}>

      </div>
  );
}