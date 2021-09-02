import { useState } from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaChapters, pushViewedManga, setCurrentManga } from '../../redux/manga/actions';
import { Manga } from '../../utils/apiTypes';
import { unwrapResult } from '@reduxjs/toolkit';
import { TDispatch } from '../../redux/types';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/chapter/ChapterList';
import { useInitialEffect } from '../../utils/hooks';
import { CenteredProgress } from '../../components/CenteredProgress';
import { MangaDetail } from '../../components/manga/detail/MangaDetail';
import { wrapper } from '../../redux/store';
import { requestMangaData, reRequestMangaData } from '../../redux/manga/utils';
import cookie from 'cookie';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type Props = {
  mangaId: Number;
};

export default function Detail({ mangaId }: Props) {
  const classes = useStyles();
  const [chaptersLoaded, setChaptersLoaded] = useState(false);
  const manga: Manga = useSelector((state: RootState) => state.manga.current);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    let promises = [] as Array<any>;
    if (~manga.id) {
      promises.push(dispatch(pushViewedManga(manga)));
    }

    reRequestMangaData(manga, (data) => {
      dispatch(setCurrentManga(data));
      promises.push(dispatch(pushViewedManga(data)));
    });

    promises.push(
      dispatch(fetchMangaChapters(mangaId))
        .then(unwrapResult)
        .then(() => setChaptersLoaded(true))
        .catch(() => {
          console.log('Chapters are not yet loaded, scheduled a timeout');
          setTimeout(() => {
            promises.push(dispatch(fetchMangaChapters(mangaId)).then(() => setChaptersLoaded(true)));
          }, 2000);
        })
    );

    return () => {
      // @ts-ignore
      promises.forEach((p) => p.abort());
    };
  });

  return (
    <div className={classes.root}>
      <Head>
        <title>Sora: {manga.title}</title>
        <meta name="description" content={manga?.description.slice(0, 55)} />

        <meta property="og:url" content="https://www.byeindonesia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={manga?.title} />
        <meta property="og:description" content={manga?.description.slice(0, 55)} />
        <meta
          property="og:image"
          content={'https://backend.sora-reader.app/api/preview/resize?image=' + manga.thumbnail}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="byeindonesia.com" />
        <meta property="twitter:url" content="https://www.byeindonesia.com/" />
        <meta name="twitter:title" content={manga?.title} />
        <meta name="twitter:description" content={manga?.description.slice(0, 55)} />
        <meta
          name="twitter:image"
          content={'https://backend.sora-reader.app/api/preview/resize?image=' + manga.thumbnail}
        ></meta>
      </Head>
      <SwipeableTabs panelNames={['Описание', 'Главы']}>
        <Box p={2} style={{ padding: 0 }}>
          <MangaDetail manga={manga} />
        </Box>
        <Box p={2}>
          {chaptersLoaded ? <ChapterList mangaId={manga.id} chapters={manga.chapters} /> : <CenteredProgress />}
        </Box>
      </SwipeableTabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ params, req, store }) => {
  console.log('GETSERVERSIDEPROPS');
  const mangaId = Number(params?.id);
  console.log('MANGA', mangaId);
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  if (mangaId) {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const cookieMangaId = cookies.currentMangaId;
    if (cookieMangaId === params?.id) return { props: { mangaId } };

    const dispatch = store.dispatch as TDispatch;
    try {
      const initialMangaData = await requestMangaData(mangaId);
      dispatch(setCurrentManga(initialMangaData));
      console.log('DISPATCH');
      await delay(1000);
      console.log('DELAYED');
    } catch (e) {
      console.log('Eror on server side');
    }
    return { props: { mangaId } };
  }
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
});
