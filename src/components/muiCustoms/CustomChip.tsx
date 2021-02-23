import * as React from 'react';
import {
  Chip,
  ChipProps,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {OverridableComponentMock} from './index';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    fontSize: 'large',
    borderRadius: 5,
  },
}));

type Props = ChipProps | OverridableComponentMock;

export function CustomChip(props: Props) {
  const propClasses = props.classes ? props.classes : {};
  const classes = {...useStyles(), ...propClasses};

  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Chip {...props} size={smallMedia ? 'small' : 'medium'}
            className={classes.root}/>
  );
}

