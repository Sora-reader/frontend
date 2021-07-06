import { useEffect, useState } from 'react';
import { createStyles, List, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { RootState } from '../redux/store';
import { startSearch } from '../redux/search/actions';
import { useNonLazyQuery, useSyncQuery } from '../utils/search/hooks';
import { Dispatch } from 'react';
import { TDispatch } from '../redux/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { MangaList } from '../utils/apiTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const parseSearchResults = (
  searchResults: MangaList,
  storedQuery: string,
  setMessage: Dispatch<any>,
  setContent: Dispatch<any>
) => {
  if (!searchResults.length) {
    setMessage('Результатов не найдено');
    setContent(undefined);
  } else {
    setMessage(`Итог поиска по запросу: "${storedQuery}"`);
    setContent(searchResults);
  }
};

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch() as TDispatch;

  const { results: storedResults, query: storedQuery } = useSelector((state: RootState) => state.search);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('' as string);
  const [content, setContent] = useState([] as MangaList);

  const query = useNonLazyQuery('name');
  useSyncQuery(query);

  useEffect(() => {
    if (!query) {
      setMessage('Введите название манги для поиска');
      return;
    }
    if (query === storedQuery) {
      parseSearchResults(storedResults, storedQuery, setMessage, setContent);
      return;
    }
    if (!searching) {
      console.log('Started in progress');
      setMessage('');
      setContent([]);
      setSearching(true);
      dispatch(startSearch(query))
        .then(unwrapResult)
        .then(({ query, results }) => {
          setSearching(false);
          parseSearchResults(results, query, setMessage, setContent);
        })
        .catch(() => {
          setMessage('Ошибка, проверьте подключение к интернету');
        });
    }
  }, [query, storedResults]);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>{message}</h1>
      {content && (
        <List className={classes.list}>
          {content.map((item) => (
            <MangaListItem key={item.id} {...item} />
          ))}
        </List>
      )}
    </div>
  );
}
