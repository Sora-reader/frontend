import { createStyles, List, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { saveList } from '../core/consts';
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
  const favorites = useSelector((state: RootState) => state.saveLists.favorite);

  return (
    <div className={classes.root}>
      {favorites.length ? (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {saveList.favorite.alt}
          </Typography>
          <List>
            {favorites.map((element) => (
              <MangaListItem key={element.id} {...element} />
            ))}
          </List>
        </>
      ) : null}
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
