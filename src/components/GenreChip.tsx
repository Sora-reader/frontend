import React, { forwardRef, Ref } from 'react';
import { Chip, ChipProps, createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      fontSize: 'large',
      borderRadius: 5,
    },
  })
);

export const GenreChip = forwardRef<any, ChipProps>((props: ChipProps, ref: Ref<any>) => {
  const propClasses = props.classes ? props.classes : {};
  const classes = { ...useStyles(), ...propClasses };

  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chip size={smallMedia ? 'small' : 'medium'} className={classes.root} ref={ref} {...props} />;
});

GenreChip.displayName = 'GenreChip';
