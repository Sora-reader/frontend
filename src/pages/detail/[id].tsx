import { useMemo } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { wrapper } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/chapter/ChapterList';
import { MangaDetail } from '../../components/manga/detail/MangaDetail';
import { getOpenGraphForManga } from '../../common/opengraph';
import { isClientSideNavigation } from '../../common/router';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';
import { captureAxiosToError } from '../../common/utils';
import { Manga } from '../../api/types';
import { mangaAPIBaseUrl, mangaDetailQuery, useChaptersQuery, useDetailQuery } from '../../api/manga';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    chapterSkeleton: {
      height: '3rem',
    },
  })
);

type Props = {
  mangaId?: number;
  manga?: Manga;
};

export default function Detail({ mangaId, manga: initialData }: Props) {
  const classes = useStyles();
  const detailQuery = useDetailQuery(mangaId as number, { skip: !Boolean(mangaId) });
  const chaptersQuery = useChaptersQuery(mangaId as number, { skip: !Boolean(mangaId) });
  const manga = useMemo(() => (detailQuery.isSuccess ? detailQuery.data : initialData), [detailQuery, initialData]);

  return (
    <div className={classes.root}>
      <Head>
        {manga ? (
          <>
            <title>Sora: {manga.title}</title>
            {getOpenGraphForManga(manga)}
          </>
        ) : null}
      </Head>
      <SwipeableTabs panelNames={['Описание', 'Главы']}>
        <Box p={2} style={{ padding: 0 }}>
          <MangaDetail manga={manga} />
        </Box>
        <Box p={2}>
          <ChapterList mangaId={mangaId} chapters={chaptersQuery.data} />
        </Box>
      </SwipeableTabs>
    </div>
  );
}

/**
 * Server-side props for manga detail view.
 * 1. Ignore client-side requests
 * 2. If manga id param was provided, then fetch
 *    - If fetch fails, then send empty mangaId which triggers client-side redirect.
 *        This is because there is not hydration if we redirect from SSR and we want to show error alerts
 * 3. If it's not provided - redirect to search
 */
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ req, store, query }) => {
  const clientSideNavigation = isClientSideNavigation(req);
  const mangaId = Number(query?.id);

  if (clientSideNavigation) return { props: { mangaId } };

  if (mangaId) {
    try {
      const manga = await axios.get(mangaAPIBaseUrl + mangaDetailQuery(mangaId));
      return { props: { mangaId, manga: manga.data } };
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 404) return { notFound: true };
      Sentry.captureException(e);
      await captureAxiosToError(store.dispatch, error);
      return {
        props: {},
      };
    }
  }
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
});
