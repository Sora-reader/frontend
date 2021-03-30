import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  createStyles,
  LinearProgress,
  List,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { SearchItem } from '../components/views/search/SearchItem';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/store';
import { searchManga } from '../redux/search/action';
import { SearchResultsType } from '../catalogs/baseCatalog';

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

const getResultList = (searchResults: SearchResultsType, classes: ReturnType<typeof useStyles>, query: String) => {
  console.log("Search results", searchResults);
  if (!searchResults.results) {
    return <h1 className={classes.header}>
      Результатов не найдено
    </h1>
  }
  else if (!~searchResults.results) {
    return <h1 className={classes.header}>
      Ошибка, проверьте подключение к интернету
    </h1>
  }
  return <div>
    <h1 className={classes.header}>Итог поиска по запросу: "{query}"</h1>
    <List className={classes.list}> {
      searchResults.items.map(item => {
        return <SearchItem key={item.link} data={item} />;
      })
    }
    </List>
  </div>;
};

export default function Search() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const { results: searchResults, query: cachedQuery } = useSelector((state: State) => state.search);
  const [loading, setLoading] = useState(false);
  // To determine if loading false after completing search or it's initial value
  const [didSearchStart, setDidSearchStart] = useState(false);

  const queryKey = 'name';
  let rootStyle = classes.root;
  let content: JSX.Element = <h1 className={classes.header}>
    Введите название манги для поиска
  </h1>;

  const match = router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
  const query = match ? match[1] || "" : "";

  useEffect(() => {
    if (didSearchStart) {
      console.log("Search results were updated", searchResults, loading);
      if (loading) {
        console.log("Set loading false");
        setLoading(false);
      }
    }
  }, [searchResults]);

  useEffect(() => {
    if (query && query !== cachedQuery) {
      console.log("Starting search");
      // Start search if we don't need cache and there is a query
      setLoading(true);
      setDidSearchStart(true);
      dispatch(searchManga(query));
    }
  }, [query]);

  if (query && query === cachedQuery) {
    // Use cache the query is the same as last search
    console.log("Query is equal to the cached one");
    content = getResultList(searchResults, classes, query);
  }
  else if (didSearchStart) {
    if (loading) {
      rootStyle = classes.progressRoot;
      content = <LinearProgress className={classes.progress} />;
    }
    else {
      console.log("Loading finished");
      content = getResultList(searchResults, classes, query);
    }
  }

  return (
    <div className={rootStyle}>
      {content}
    </div>
  );
}