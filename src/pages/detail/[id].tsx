import { useState } from 'react';
import { Box, createStyles, List, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaChapters, pushViewedManga, setCurrentManga } from '../../redux/manga/actions';
import { Manga } from '../../common/apiTypes';
import { unwrapResult } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/chapter/ChapterList';
import { useInitialEffect } from '../../common/hooks';
import { MangaDetail } from '../../components/manga/detail/MangaDetail';
import { requestMangaData, reRequestMangaData } from '../../redux/manga/utils';
import { Skeleton } from '@material-ui/lab';
import { ChapterItem } from '../../components/manga/detail/chapter/ChapterItem';
import { useEffect } from 'react';
import { getOpenGraphForManga } from '../../common/opengraph';
import { isClientSideNavigation } from '../../common/router';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    chapterSkeleton: {
      height: '3rem',
    },
  })
);

type Props = {
  mangaId: Number;
  ssrManga?: Manga;
};

export default function Detail({ mangaId, ssrManga }: Props) {
  const classes = useStyles();
  const [chaptersLoaded, setChaptersLoaded] = useState(false);
  const [manga, setManga] = useState(ssrManga ?? { id: -1, title: '', description: '' });

  const stateManga: Manga = useSelector((state: RootState) => state.manga.current);

  useInitialEffect(() => {
    if (stateManga.id === -1 && ssrManga && ssrManga?.id !== -1) dispatch(setCurrentManga(ssrManga));
  });

  useEffect(() => {
    if (stateManga.id !== -1) setManga(stateManga);
  }, [stateManga]);

  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    if (~manga.id) {
      dispatch(pushViewedManga(manga));
    }

    reRequestMangaData(manga, (data) => {
      dispatch(setCurrentManga(data));
      dispatch(pushViewedManga(data));
    });

    dispatch(fetchMangaChapters(mangaId))
      .then(unwrapResult)
      .then(() => setChaptersLoaded(true))
      .catch(() => {
        console.log('Chapters are not yet loaded, scheduled a timeout');
        setTimeout(() => {
          dispatch(fetchMangaChapters(mangaId)).then(() => setChaptersLoaded(true));
        }, 2000);
      });
  });

  return (
    <div className={classes.root}>
      <Head>
        <title>Sora: {manga.title}</title>
        {getOpenGraphForManga(manga)}
      </Head>
      <SwipeableTabs panelNames={['Описание', 'Главы']}>
        <Box p={2} style={{ padding: 0 }}>
          <MangaDetail manga={manga} />
        </Box>
        <Box p={2}>
          {chaptersLoaded ? (
            <ChapterList mangaId={manga.id} chapters={manga.chapters} />
          ) : (
            <List>
              {Array(17).fill(
                <Skeleton width="100%">
                  <ChapterItem chapter={{} as any} mangaId={0} index={0} />
                </Skeleton>
              )}
            </List>
          )}
        </Box>
      </SwipeableTabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const clientSideNavigation = isClientSideNavigation(req);
  const mangaId = Number(params?.id);

  if (clientSideNavigation) return { props: { mangaId } };

  if (mangaId) {
    try {
      const ssrManga = await requestMangaData(mangaId);
      return { props: { mangaId, ssrManga } };
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 404) return { notFound: true };
      Sentry.captureException(e);
      res.statusCode = Number(error?.response?.status) || 400;
      return { props: {} };
    }
  }
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
};
