// @flow
import * as React from 'react';
import {Chip, createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    fontSize: 'large',
    borderRadius: 5,
  },
}));

export function CustomChip(props: any) {
  const classes = useStyles();

  return (
      <Chip className={classes.root} {...props}/>
  );
}