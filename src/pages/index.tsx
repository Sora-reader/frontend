// @flow
import {createStyles, makeStyles} from '@material-ui/core';

type Props = {}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    paddingTop: theme.spacing(1),
    minHeight: '100vh',
  },
  header: {
    padding: theme.spacing(0, 1),
    textAlign: 'center',
  },
}));

export default function IndexView(props: Props) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <h1 className={classes.header}>Главная страница</h1>
      </div>
  );
}