import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStyles, List, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { RootState } from '../redux/store';
import { searchManga } from '../redux/search/actions';
import { MangaType, SearchResults } from '../catalogs/baseCatalog';
import { useNonLazyQuery, useSyncQuery } from '../utils/search/hooks';
import { Dispatch } from 'react';
import { TDispatch } from '../redux/types';

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

  const { results: searchResults, query: cachedQuery, searchInputRef } = useSelector(
    (state: RootState) => state.search
  );
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('' as string);
  const [content, setContent] = useState(undefined as SearchResults<MangaType> | undefined);

  const query = useNonLazyQuery('name');
  useSyncQuery(searchInputRef, query);

  useEffect(() => {
    if (!query) {
      setMessage('Введите название манги для поиска');
      return;
    }
    if (query === cachedQuery) {
      parseSearchResults(searchResults, setMessage, setContent);
      return;
    }
    if (!searching) {
      console.log('Started in progress');
      setMessage('');
      setContent(undefined);
      setSearching(true);
      dispatch(searchManga(query)).then((data: any) => {
        setSearching(false);
        parseSearchResults(data.searchResults, setMessage, setContent);
      });
    }
  }, [query, searchResults]);

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
