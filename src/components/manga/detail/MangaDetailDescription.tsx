import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
  })
);

type Props = {
  text: string;
};

export function MangaDetailDescription(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{props.text}</Typography>
    </div>
  );
}
