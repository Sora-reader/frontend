import { createStyles, List, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { RootState } from '../redux/store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      minHeight: '100vh',
    },
  })
);

export default function IndexView() {
  const classes = useStyles();
  const lastVisited = useSelector((state: RootState) => state.manga.viewed);

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        {lastVisited.length ? 'Недавно просмотренные' : 'Ни одной манги не просмотрено'}
      </Typography>
      <List>
        {lastVisited.map((element) => (
          <MangaListItem key={element.id} {...element} />
        ))}
      </List>
    </div>
  );
}
