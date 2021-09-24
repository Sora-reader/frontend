import { createStyles, List, makeStyles, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { saveList } from '../core/consts';
import { setCurrentManga } from '../redux/manga/actions';
import { RootState, wrapper } from '../redux/store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      minHeight: '100vh',
    },
  })
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ store }) => {
  console.log('===> SSR!');
  store.dispatch(setCurrentManga({ id: 1, title: 'asd', description: '', chapters: [] }));
  return {
    props: {},
  };
});

export default function IndexView() {
  const classes = useStyles();
  const lastVisited = useSelector((state: RootState) => state.manga.viewed);
  const favorites = useSelector((state: RootState) => state.saveLists.favorite);
  const manga = useSelector((state: RootState) => state.manga.current);

  return (
    <div className={classes.root}>
      Current manga {manga?.id}
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
