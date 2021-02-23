import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  createStyles,
  LinearProgress,
  List,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {SearchItem} from '../components/views/search/SearchItem';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../redux/store';
import {searchManga} from '../redux/search/action';

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    paddingTop: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(0, 1),
    textAlign: 'center',
  },
  progressRoot: {
    paddingTop: 0,
  },
  progress: {},
  list: {
    padding: theme.spacing(3, 1),
  },
})));

export default function Search() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchState = useSelector((state: State) => state.search);
  const searchResults = searchState.results;
  const cachedQuery = searchState.query;
  const query = router.query.name ? String(router.query.name) : undefined;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      dispatch(searchManga(query));
      setLoading(false);
    }
  }, [query]);

  let rootStyle = classes.root;
  let content: JSX.Element;

  const contentLoaded = (cached = false) => {
    return <div>
      <h1 className={classes.header}>Итог поиска по запросу: "{
        cached ? cachedQuery : query}"</h1>
      <List className={classes.list}> {
        searchResults.items.map(item => {
          return <SearchItem key={item.link} data={item}/>;
        })
      }
      </List>
    </div>;
  };

  if (query) {
    if (loading) {
      rootStyle = classes.progressRoot;
      content = <LinearProgress className={classes.progress}/>;
    } else {
      // Content loaded
      if (searchResults.items.length) {
        content = contentLoaded();
      } else {
        if (searchResults.results >= 0) {
          //  No results
          content = <h1 className={classes.header}>
            Результатов не найдено
          </h1>;
        } else {
          // Request error
          content = <h1 className={classes.header}>
            Ошибка, проверьте подключение к интернету
          </h1>;
        }
      }
    }
  } else if (cachedQuery) {
    content = contentLoaded(true);
  } else {
    // No query
    content = <h1 className={classes.header}>
      Введите название манги для поиска
    </h1>;
  }

  return (
      <div className={rootStyle}>
        {content}
      </div>
  );
}