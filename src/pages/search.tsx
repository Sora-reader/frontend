// @flow
import * as React from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {
  createStyles,
  LinearProgress,
  List,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {SearchResultsType} from '../catalogs/baseCatalog';
import {ReadManga} from '../catalogs/ReadManga';
import {SearchItem} from '../components/views/search/SearchItem';
import {useRouter} from 'next/router';

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
  const initialState: SearchResultsType = {
    results: 0,
    invalidResults: 0,
    items: [],
  };

  const [listData, setListData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const router = useRouter();
  const query = String(router.query.name);

  useEffect(() => {
    if (query) {
      setLoading(true);
      ReadManga.search.run(query).then(data => {
        setListData(data);
        setLoading(false);
      });
    }
  }, [query, setLoading]);

  let rootStyle = classes.root;
  let content: JSX.Element;

  if (query) {
    if (loading) {
      rootStyle = classes.progressRoot;
      content = <LinearProgress className={classes.progress}/>;
    } else {
      // Content loaded
      if (listData.items.length) {
        content = <div>
          <h1 className={classes.header}>Итог поиска по запросу: "{query}"</h1>
          <List className={classes.list}> {
            listData.items.map(item => {
              return <SearchItem key={item.link} data={item}/>;
            })
          }
          </List>
        </div>;
      } else {
        //  No results
        content = <h1 className={classes.header}>
          Результатов не найдено
        </h1>;
      }
    }
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