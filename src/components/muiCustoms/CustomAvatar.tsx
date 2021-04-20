import * as React from 'react';
import { Avatar, AvatarProps, createStyles, makeStyles } from '@material-ui/core';
import { OverridableComponentMock } from './index';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type Props = AvatarProps | OverridableComponentMock;

export function CustomAvatar(props: Props) {
  const propClasses = props.classes ? props.classes : {};
  const classes = { ...useStyles(), ...propClasses };

  return <Avatar className={classes.root} variant="rounded" {...props} />;
}
