import { useState } from 'react';
import { Box, createStyles, List, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, wrapper } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaChapters, pushViewedManga, setCurrentManga } from '../../redux/manga/actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/chapter/ChapterList';
import { useInitialEffect } from '../../common/hooks';
import { MangaDetail } from '../../components/manga/detail/MangaDetail';
import { requestMangaData, reRequestMangaData } from '../../redux/manga/utils';
import { Skeleton } from '@material-ui/lab';
import { ChapterItem } from '../../components/manga/detail/chapter/ChapterItem';
import { getOpenGraphForManga } from '../../common/opengraph';
import { isClientSideNavigation } from '../../common/router';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';
import { captureAxiosToError } from '../../common/utils';

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
};

export default function Detail({ mangaId }: Props) {
  const classes = useStyles();
  const [chaptersLoaded, setChaptersLoaded] = useState(false);
  const manga = useSelector((state: RootState) => state.manga.current);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    if (manga) {
      dispatch(pushViewedManga(manga));

      reRequestMangaData(manga, (data) => {
        dispatch(setCurrentManga(data));
        dispatch(pushViewedManga(data));
      });
    }

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
          {chaptersLoaded && manga ? (
            <ChapterList mangaId={manga.id} chapters={manga.chapters} />
          ) : (
            <List>
              {Array.from(Array(17), (_, i) => (
                <Skeleton key={i} width="100%">
                  <ChapterItem chapter={{} as any} mangaId={0} index={0} />
                </Skeleton>
              ))}
            </List>
          )}
        </Box>
      </SwipeableTabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, req, res, store }) => {
    const clientSideNavigation = isClientSideNavigation(req);
    const mangaId = Number(params?.id);

    if (clientSideNavigation) return { props: { mangaId } };

    if (mangaId) {
      try {
        const ssrManga = await requestMangaData(mangaId);
        store.dispatch(setCurrentManga(ssrManga));
        return { props: { mangaId } };
      } catch (e) {
        const error = e as AxiosError;
        console.log(error.config);
        if (error?.response?.status === 404) return { notFound: true };
        Sentry.captureException(e);
        captureAxiosToError(store.dispatch, error);
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    };
  }
);
