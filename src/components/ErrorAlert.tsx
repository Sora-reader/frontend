import { createStyles, makeStyles, Snackbar, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dismissError } from '../redux/errors/actions';
import { AppError } from '../redux/errors/types';

type Props = {
  error: AppError;
  index: number;
};

const useStyles = makeStyles<Theme, Props>(() =>
  createStyles({
    anchorOriginBottomRight: {
      bottom: ({ index }) => `calc(${index * 60}px + 24px)`,
    },
    alertRoot: {
      width: '150px',
      textOverflow: 'ellipsis ellipsis',
    },
    alertMessage: {
      overflowX: 'clip',
      textOverflow: 'ellipsis ellipsis',
    },
  })
);

export const ErrorAlert = (props: Props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    console.log('Dismiss error');
    dispatch(dismissError(props.error.id));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      classes={{ anchorOriginBottomRight: classes.anchorOriginBottomRight }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        classes={{ root: classes.alertRoot, message: classes.alertMessage }}
      >
        {props.error.title}
      </Alert>
    </Snackbar>
  );
};
