import React, { forwardRef, Ref } from 'react';
import { Avatar, AvatarProps, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export const MangaImage = forwardRef<any, AvatarProps>((props: AvatarProps, ref: Ref<any>) => {
  const propClasses = props.classes ? props.classes : {};
  const classes = { ...useStyles(), ...propClasses };

  return <Avatar className={classes.root} variant="rounded" ref={ref} {...props} />;
});

MangaImage.displayName = 'MangaImage';
