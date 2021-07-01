import { createStyles, List, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { RootState } from '../redux/store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      minHeight: '100vh',
    },
    lastVisited: {
      padding: theme.spacing(0, 1),
      textAlign: 'center',
    },
  })
);

export default function IndexView() {
  const classes = useStyles();
  const lastVisited = useSelector((state: RootState) => state.manga.lastVisited);

  return (
    <div className={classes.root}>
      <h1 className={classes.lastVisited}>Недавно просмотренные</h1>
      <List>
        {lastVisited.map((element) => (
          <MangaListItem key={element.id} data={element} />
        ))}
      </List>
    </div>
  );
}
