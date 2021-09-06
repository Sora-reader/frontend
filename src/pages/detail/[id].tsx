import { useState } from 'react';
import { Box, createStyles, List, makeStyles } from '@material-ui/core';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaChapters, pushViewedManga, setCurrentManga } from '../../redux/manga/actions';
import { Manga } from '../../utils/apiTypes';
import { unwrapResult } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/chapter/ChapterList';
import { useInitialEffect } from '../../utils/hooks';
import { MangaDetail } from '../../components/manga/detail/MangaDetail';
import { requestMangaData, reRequestMangaData } from '../../redux/manga/utils';
import { baseUrl, domain, resizeUrl } from '../../core/consts';
import { Skeleton } from '@material-ui/lab';
import { ChapterItem } from '../../components/manga/detail/chapter/ChapterItem';
import { useEffect } from 'react';

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

const getDescription = (manga: Manga) => {
  const output = `Sora: ${manga.description}`;
  if (output.length > 55) return output.slice(0, 52) + '...';
  return output;
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

  useEffect(() => {
    console.log('Manga was updated', manga);
  }, [manga]);

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
        <meta name="description" content={getDescription(manga)} />

        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={manga?.title} />
        <meta property="og:description" content={getDescription(manga)} />
        <meta property="og:image" content={resizeUrl + manga?.image || manga.thumbnail} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={manga?.title} />
        <meta name="twitter:description" content={getDescription(manga)} />
        <meta name="twitter:image" content={resizeUrl + manga?.image || manga.thumbnail}></meta>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('Detail GSS');
  const mangaId = Number(params?.id);
  if (mangaId) {
    const ssrManga = await requestMangaData(mangaId);
    return { props: { mangaId, ssrManga } };
  }
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
};
