import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, wrapper } from '../../../../redux/store';
import { fetchAll, fetchChapterImages, setCurrentChapter, setCurrentManga } from '../../../../redux/manga/actions';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';
import { CurrentChapter, CurrentChapterImages } from '../../../../redux/manga/reducer';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as Sentry from '@sentry/nextjs';
import { CircularProgress, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useInitialEffect } from '../../../../common/hooks';
import { Header } from '../../../../components/header/Header';
import { isClientSideNavigation, navigateToDetail } from '../../../../common/router';
import { requestAllMangaData } from '../../../../redux/manga/utils';
import { AxiosError } from 'axios';
import { captureAxiosToError } from '../../../../common/utils';
import { useChaptersQuery, useDetailQuery, useImagesQuery } from '../../../../api/manga';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters } from '../../../../api/types';

const useStyles = makeStyles(() =>
  createStyles({
    headerInner: {},
    header: { opacity: 0.7 },
  })
);

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
  initial?: { manga: Manga; chapters: MangaChapters; images: MangaChapterImages };
};

export default function Read({ mangaId, volumeNumber, chapterNumber, initial }: Props) {
  const classes = useStyles();
  const router = useRouter();

  const detailQuery = useDetailQuery(mangaId, { skip: !Boolean(mangaId) });
  const manga = useMemo(
    () => (detailQuery.isSuccess ? detailQuery.data : initial?.manga),
    [detailQuery, initial?.manga]
  );

  const chaptersQuery = useChaptersQuery(mangaId, { skip: !Boolean(mangaId) });
  const chapters = useMemo(
    () => (chaptersQuery.isSuccess ? chaptersQuery.data : initial?.chapters),
    [chaptersQuery, initial?.chapters]
  );
  const chapter = useMemo(
    (): MangaChapter | undefined =>
      chapters &&
      chapters.find(
        (chapterElement) => chapterElement.volume === volumeNumber && chapterElement.number === chapterNumber
      ),
    [chapters, chapterNumber, volumeNumber]
  );

  const imagesQuery = useImagesQuery(chapter?.id as number, { skip: !Boolean(chapter?.id) });
  const images = useMemo(
    () => (imagesQuery.isSuccess ? imagesQuery.data : initial?.images),
    [imagesQuery, initial?.images]
  );

  const [headerImageNumber, setHeaderImageNumber] = useState(0);
  const [mode, setMode] = useState(undefined as ReaderMode | undefined);
  const [showHeader, setShowHeader] = useState(false);
  const dispatch = useAppDispatch();
useEffect(() => {
    if (chapter?.images?.length) {
      const img = new Image();
      img.src = images[0];
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        if (ratio > 2) {
          setMode('webtoon');
        } else {
          setMode('default');
        }
      };
    }
  }, [chapter?.images]);



  if (!(images && chapterNumber === chapter?.number && volumeNumber === chapter?.volume && manga?.id === mangaId)) {
    return <CircularProgress />;
  }
    // Current chapter.number may differ from chapterNumber in case of replacing route
  return chapterReady && manga ? (
    <>
      <Slide appear={false} direction="down" in={!showHeader}>
        <Header
          className={classes.header}
          icon={<ArrowBackIcon />}
          onIconClick={() => navigateToDetail(router, manga.id, 1)}
        >
          <div className={classes.headerInner}>
            <Typography color="textPrimary" variant="h6">
              {chapter?.title}
            </Typography>
            {chapter?.images ? (
              <Typography color="textPrimary" variant="subtitle1">
                {headerImageNumber} / {images.length}
              </Typography>
            ) : null}
          </div>
        </Header>
      </Slide>
      <Reader
        onClick={() => setShowHeader(!showHeader)}
        manga={manga}
        chapter={chapter as CurrentChapter & Required<CurrentChapterImages>}
        mode={mode}
        setHeaderImageNumber={setHeaderImageNumber}
      />
    </>
  ) : (
    <CenteredProgress />
  );
}

/**
 * Server-side props for chapter read view.
 * 1. Ignore client-side requests
 * 2. If all needed params were provided, then fetch
 *    - If fetch fails, then send empty props which triggers client-side redirect.
 *        This is because there is not hydration if we redirect from SSR and we want to show error alerts
 * 3. If it's not provided - redirect to search
 */
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ req, store, query }) => {
  const mangaId = Number(query.mangaId);
  const volumeNumber = Number(query.volumeNumber);
  const chapterNumber = Number(query.chapterNumber);
  const props = {
    mangaId,
    volumeNumber,
    chapterNumber,
  };

  const clientSideNavigation = isClientSideNavigation(req);

  if (clientSideNavigation) return { props };

  if (mangaId && volumeNumber && chapterNumber) {
    try {
      const ssrData = await requestAllMangaData(mangaId, volumeNumber, chapterNumber);
      store.dispatch(setCurrentManga(ssrData.current));
      store.dispatch(setCurrentChapter(ssrData.chapter));
      return { props: { mangaId } };
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
