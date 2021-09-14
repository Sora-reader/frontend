import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { AppError } from '../../redux/errors/types';

type Props = {
  error: AppError;
  open: boolean;
  handleClose: () => void;
};

export const ErrorDialog = ({ error, open, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{error.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error.url ? <Typography variant="body1">URL: {error.url}</Typography> : null}
          <br />
          {error.message ? <Typography variant="body1">{error.message}</Typography> : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
