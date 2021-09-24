import { forwardRef, Ref } from 'react';
import { createStyles, darken, lighten, makeStyles, Theme } from '@material-ui/core';
import Alert, { AlertProps } from '@material-ui/lab/Alert';

type Severity = 'error' | 'info' | 'success' | 'warning';

const useStyles = makeStyles<Theme, AppAlertProps>((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      backgroundColor: ({ severity }) => {
        const getColor = theme.palette.type == 'dark' ? darken : lighten;
        return getColor(theme.palette[severity as Severity].main, 0.3);
      },
      cursor: 'pointer',
      width: '200px',
      textOverflow: 'ellipsis ellipsis',
    },
    message: {
      overflowX: 'clip',
      textOverflow: 'ellipsis ellipsis',
    },
  })
);

export type AppAlertProps = Omit<AlertProps, 'severity'> & { severity: Severity };

export const AppAlert = forwardRef<any, AppAlertProps>((props: AppAlertProps, ref: Ref<any>) => {
  let classes = { ...useStyles(props), ...props.classes };

  return <Alert classes={classes} ref={ref} {...props} />;
});
