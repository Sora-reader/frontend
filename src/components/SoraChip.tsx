import { forwardRef, Ref } from 'react';
import { Chip, ChipProps, createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      fontSize: 'large',
      borderRadius: 5,
    },
  })
);

export type SoraChipProps = ChipProps<any, { component: any }>;

export const SoraChip = forwardRef<any, SoraChipProps>((props: SoraChipProps, ref: Ref<any>) => {
  let classes = { ...useStyles(), ...props.classes };

  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chip size={smallMedia ? 'small' : 'medium'} color="primary" className={classes.root} ref={ref} {...props} />;
});
