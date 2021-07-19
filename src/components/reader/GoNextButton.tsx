import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ForwardIcon from '@material-ui/icons/Forward';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  goNext: {
    color: theme.palette.text.primary,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type Props = {
  nextUrl: string | number;
  exit?: boolean;
};

export const GoNextButton = ({ nextUrl, exit }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  const goNext = useCallback(() => {
    if (nextUrl) router.replace(String(nextUrl));
  }, [nextUrl]);

  return (
    <Fab className={classes.goNext} aria-label="goNext" variant="round" color="primary" onClick={goNext}>
      {!exit ? <ForwardIcon /> : <ExitIcon />}
    </Fab>
  );
};
