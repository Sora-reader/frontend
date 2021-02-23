import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {Rating, RatingProps} from '@material-ui/lab';
import {OverridableComponentMock} from './index';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
}));

type Props = RatingProps | OverridableComponentMock;

export function CustomRating(props: Props) {
  const propClasses = props.classes ? props.classes : {};
  const classes = {...useStyles(), ...propClasses};
  
  return (
      <Rating {...props} readOnly precision={0.1} className={classes.root}
              value={props.value ? props.value / 2 : 0}/>
  );
}