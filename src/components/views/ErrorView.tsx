import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center',
      paddingTop: theme.spacing(2),
    },
    message: {
      display: 'inline-block',
    },
  })
);

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

export function ErrorView({ children }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.message}>{children}</div>
    </div>
  );
}
