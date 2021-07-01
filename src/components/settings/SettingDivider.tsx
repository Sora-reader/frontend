import { forwardRef } from 'react';
import Divider, { DividerProps } from '@material-ui/core/Divider';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '1rem',
    },
  })
);

export const SettingDivider = forwardRef<any, DividerProps>(({ children, classes, ...props }: DividerProps, ref) => {
  const baseClasses = useStyles();

  return (
    <Divider
      classes={{
        ...baseClasses,
        ...classes,
      }}
      ref={ref}
      {...props}
    >
      {children}
    </Divider>
  );
});
