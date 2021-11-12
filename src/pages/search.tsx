import { useEffect, useState } from 'react';
import { Box, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useAppDispatch } from '../redux/store';
import { useNonLazyQuery, useSyncQuery } from '../common/search/hooks';
import { MangaList, MangaSearchResult } from '../api/types';
import { useScrolledBottom } from '../common/hooks';
import { MangaListView } from '../components/views/MangaListView';
import { usePaginateMutation, useSearchQuery } from '../api/search';
import { addError } from '../redux/errors/actions';
import { isAbortError, isFetchError, unwrapMutationResult } from '../api/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      overflowY: 'hidden',
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

export default function Search() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const scrolledBottom = useScrolledBottom();

  const query = useNonLazyQuery('name');
  useSyncQuery(query);

  const search = useSearchQuery(query, { skip: !Boolean(query) });
  const [paginate, pagination] = usePaginateMutation();
  const [results, setResults] = useState(undefined as MangaList | undefined);
  const [lastResult, setLastResult] = useState(undefined as MangaSearchResult | undefined);

  useEffect(() => {
    if (!search.isError) {
      setLastResult(search.data);
      setResults(search.data?.results);
    } else {
      if (isAbortError(search.error)) {
        console.log('Search aborted', search.error);
        return;
      }
      dispatch(
        addError({
          title: 'Ошибка поиска',
          message: isFetchError(search.error) ? search.error.error : JSON.stringify(search.error),
        })
      );
    }
  }, [search, dispatch]);

  useEffect(() => {
    let paginatePromise: ReturnType<typeof paginate> | undefined;
    if (scrolledBottom && !(search.isLoading || pagination.isLoading) && lastResult?.next) {
      console.log('===> Starting to paginate');
      paginatePromise = paginate(lastResult.next);
      paginatePromise
        .then(unwrapMutationResult)
        .then((res: any) => {
          console.log('Finished paginating', res, paginatePromise, pagination);
          setLastResult(res.data);
          setResults([...(results || []), ...res.data.results]);
        })
        .catch((err) => {
          if (isAbortError(err)) {
            console.log('Pagination aborted', err);
            return;
          }
          dispatch(
            addError({
              title: 'Ошибка пагинации',
              url: paginatePromise?.arg.originalArgs,
              message: isFetchError(err) ? err.error : JSON.stringify(err),
            })
          );
        });
    }
    return () => {
      if (paginatePromise?.abort) paginatePromise.abort();
    };
  }, [scrolledBottom, dispatch, lastResult, paginate, pagination, search.isLoading, results]);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>
        {search.isError
          ? 'Ошибка, проверьте подключение к интернету'
          : !query
          ? 'Введите название манги для поиска'
          : null}
      </h1>
      {search.isLoading || search.isFetching ? (
        <MangaListView header="Идет поиск" />
      ) : query && !search.isError ? (
        <MangaListView
          header={lastResult?.count !== undefined ? `Найдено ${lastResult?.count} результатов` : ''}
          mangaList={results}
        />
      ) : null}
      {pagination.isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Box>
      ) : (
        ''
      )}
    </div>
  );
}
