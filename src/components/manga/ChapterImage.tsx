import { createStyles, makeStyles } from '@material-ui/core';
import { memo } from 'react';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      height: '100%',
      width: '100%',
    },
  })
);

type Props = {
  image: string;
};

export const ChapterImage = memo(({ image }: Props) => {
  // TODO: add click handler
  const classes = useStyles();
  return <Avatar variant="square" className={classes.image} src={image} />;
});
