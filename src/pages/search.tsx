import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStyles, List, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { RootState } from '../redux/store';
import { startSearch } from '../redux/search/actions';
import { SearchResults } from '../catalogs/baseCatalog';
import { useNonLazyQuery, useSyncQuery } from '../utils/search/hooks';
import { Dispatch } from 'react';
import { TDispatch } from '../redux/types';
import { unwrapResult } from '@reduxjs/toolkit';

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

const parseSearchResults = (searchResults: SearchResults, setMessage: Dispatch<any>, setContent: Dispatch<any>) => {
  switch (searchResults.results) {
    case 0:
      setMessage('Результатов не найдено');
      setContent(undefined);
      break;
    case -1:
      setMessage('Ошибка, проверьте подключение к интернету');
      break;
    default:
      setMessage(`Итог поиска по запросу: "${searchResults.query}"`);
      setContent(searchResults);
      break;
  }
};

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch() as TDispatch;

  const { results: storedResults, searchInputRef } = useSelector((state: RootState) => state.search);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('' as string);
  const [content, setContent] = useState(undefined as SearchResults | undefined);

  const query = useNonLazyQuery('name');
  useSyncQuery(searchInputRef, query);

  useEffect(() => {
    if (!query) {
      setMessage('Введите название манги для поиска');
      return;
    }
    if (query === storedResults.query) {
      parseSearchResults(storedResults, setMessage, setContent);
      return;
    }
    if (!searching) {
      console.log('Started in progress');
      setMessage('');
      setContent(undefined);
      setSearching(true);
      dispatch(startSearch(query))
        .then(unwrapResult)
        .then((data) => {
          setSearching(false);
          parseSearchResults(data, setMessage, setContent);
        });
    }
  }, [query, storedResults]);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>{message}</h1>
      {content && (
        <List className={classes.list}>
          {content.items.map((item) => (
            <MangaListItem key={item.link} data={item} />
          ))}
        </List>
      )}
    </div>
  );
}
