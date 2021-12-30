import React, { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ForwardIcon from '@material-ui/icons/Forward';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';
import { shallowNavigate } from '../../common/router';

const useStyles = makeStyles((theme) => ({
  goNext: {
    color: theme.palette.text.primary,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type Props = {
  nextUrl: string;
  setCurrentImage?: Dispatch<SetStateAction<number>>;
  exit?: boolean;
};

export const GoNextButton = ({ nextUrl, setCurrentImage, exit }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(String(nextUrl));
  }, [router, nextUrl]);

  const goNext = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (nextUrl) {
        if (exit) shallowNavigate(router, nextUrl, 'replace');
        shallowNavigate(router, nextUrl, 'replace').then(() => {
          setCurrentImage && setCurrentImage(1);
        });
      }
    },
    [nextUrl, exit, setCurrentImage, router]
  );

  return (
    <Fab className={classes.goNext} aria-label="goNext" variant="round" color="primary" onClick={goNext}>
      {!exit ? <ForwardIcon /> : <ExitIcon />}
    </Fab>
  );
};
