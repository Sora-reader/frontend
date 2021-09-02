import { createStyles, makeStyles, Typography } from '@material-ui/core';

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

export default function IndexView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.message}>
        <Typography variant="h4">Страница не найдена</Typography>
      </div>
    </div>
  );
}
