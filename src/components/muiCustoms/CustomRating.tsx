import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Rating, RatingProps } from '@material-ui/lab';
import { OverridableComponentMock } from './index';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type Props = RatingProps | OverridableComponentMock;

export function CustomRating(props: Props) {
  const { classes: propClasses } = props;
  const classes = { ...useStyles(), ...propClasses };

  return (
    <Rating {...props} readOnly precision={0.1} className={classes.root} value={props.value ? props.value / 2 : 0} />
  );
}
