import { createStyles, makeStyles, Snackbar, Theme } from '@material-ui/core';
import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dismissError } from '../../redux/errors/actions';
import { AppError } from '../../redux/errors/types';
import { AppAlert } from './AppAlert';
import { ErrorDialog } from './ErrorDialog';

type Props = {
  error: AppError;
  index: number;
};

const useStyles = makeStyles<Theme, Props>(() =>
  createStyles({
    anchorOriginBottomRight: {
      bottom: ({ index }) => `calc(${index * 60}px + 24px)`,
    },
  })
);

export const ErrorSnackbar = memo((props: Props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    dispatch(dismissError(props.error.id));
  }, [setOpen, dispatch, props.error.id]);

  const handleClose = useCallback(
    (_, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
      dispatch(dismissError(props.error.id));
    },
    [setOpen, dispatch, props.error.id]
  );

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        classes={{ anchorOriginBottomRight: classes.anchorOriginBottomRight }}
      >
        <AppAlert onClose={handleClose} onClick={() => setDialogOpen(true)} severity="error">
          {props.error.title}
        </AppAlert>
      </Snackbar>
      <ErrorDialog error={props.error} open={dialogOpen} handleClose={handleDialogClose} />
    </>
  );
});
