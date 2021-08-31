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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ params, req, store }) => {
  const mangaId = Number(params?.id);
  if (mangaId) {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const cookieMangaId = cookies.currentMangaId;
    if (cookieMangaId === params?.id) return { props: { mangaId } };

    const dispatch = store.dispatch as TDispatch;
    try {
      const initialMangaData = await requestMangaData(mangaId);
      dispatch(setCurrentManga(initialMangaData));
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
        <meta property="og:title" content={manga.title} key="title" />
        <meta
          property="og:description"
          content={'Sora reader - ' + manga.title + '.\n' + manga.description}
          key="desc"
        />
        <meta property="og:image:height" content="512" key="image_height" />
        <meta property="og:image:width" content="256" key="image_width" />
        <meta property="og:image:url" content={manga.thumbnail} key="image" />
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
