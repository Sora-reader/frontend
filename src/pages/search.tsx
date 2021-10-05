import { useEffect, useState } from 'react';
import { Box, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { paginateNext, startSearch } from '../redux/search/actions';
import { useNonLazyQuery, useSyncQuery } from '../common/search/hooks';
import { Dispatch } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { MangaList, MangaSearchResult } from '../api/types';
import { useScrolledBottom } from '../common/hooks';
import { MangaListView } from '../components/views/MangaListView';

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
  searchResults: MangaSearchResult,
  storedQuery: string,
  setMessage: Dispatch<any>,
  setContent: Dispatch<any>
) => {
  if (!searchResults.results.length) {
    setMessage('Результатов не найдено');
    setContent(undefined);
  } else {
    setMessage(`Итог поиска по запросу: "${storedQuery}"`);
    setContent(searchResults.results);
  }
};

export default function Search() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { results: storedResults, query: storedQuery } = useSelector((state: RootState) => state.search);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('' as string);
  const [content, setContent] = useState([] as MangaList);
  const [paginating, setPaginating] = useState(false);
  const scrolledBottom = useScrolledBottom();

  const query = useNonLazyQuery('name');
  useSyncQuery(query);

  useEffect(() => {
    if (scrolledBottom && storedResults.next) {
      setPaginating(true);
      dispatch(paginateNext()).then(() => {
        setPaginating(false);
      });
    }
  }, [scrolledBottom, dispatch, storedResults]);

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
    // eslint-disable-next-line
  }, [query, storedResults]);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>{message}</h1>
      {content && <MangaListView header="" mangaList={content} />}
      {paginating ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        ''
      )}
    </div>
  );
}
