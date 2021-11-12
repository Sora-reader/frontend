import { forwardRef, Ref } from 'react';
import { Avatar, AvatarProps, createStyles, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type MangaImageProps = Omit<AvatarProps, 'src'> & { src?: string };

export const MangaImage = forwardRef<any, MangaImageProps>((props: MangaImageProps, ref: Ref<any>) => {
  const classes = { ...useStyles(), ...props.classes };
  const avatar = <Avatar className={classes.root} variant="rounded" ref={ref} {...props} />;
  return props.src ? avatar : <Skeleton variant="rect">{avatar}</Skeleton>;
});
