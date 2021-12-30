import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, wrapper } from '../../../../redux/store';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as Sentry from '@sentry/nextjs';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Header } from '../../../../components/header/Header';
import { isClientSideNavigation, navigateToDetail } from '../../../../common/router';
import { AxiosError } from 'axios';
import { captureAxiosToError } from '../../../../common/utils';
import { useChaptersQuery, useDetailQuery, useImagesQuery } from '../../../../api/manga';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters } from '../../../../api/types';
import { addError } from '../../../../redux/errors/actions';

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
  const dispatch = useAppDispatch();

  // Manga details
  const detailQuery = useDetailQuery(mangaId, { skip: !Boolean(mangaId) });
  const manga = useMemo(
    () => (detailQuery.isSuccess ? detailQuery.data : initial?.manga),
    [detailQuery, initial?.manga]
  );

  // Chapters
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
  useEffect(() => {
    if (images?.length) {
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
  }, [images]);

  useEffect(() => {
    if (!imagesQuery.isFetching && !imagesQuery.isLoading && images === [])
      navigateToDetail(router, mangaId).then(() => {
        dispatch(
          addError({
            title: 'Ошибка',
            message:
              'Произошла ошибка загрузки или изображения не были найдены для главы ' +
              `${manga?.title}: ${chapter?.volume} - ${chapter?.number}`,
          })
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.length]);

  // Current chapter.number may differ from chapterNumber in case of replacing route
  return manga &&
    chapters &&
    chapter &&
    images &&
    images.length &&
    chapterNumber === chapter.number &&
    volumeNumber === chapter.volume &&
    manga.id === mangaId ? (
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
            {images ? (
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
        chapters={chapters}
        chapter={chapter}
        images={images}
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
