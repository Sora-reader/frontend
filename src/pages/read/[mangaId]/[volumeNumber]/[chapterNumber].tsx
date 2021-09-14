import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../redux/store';
import { TDispatch } from '../../../../redux/types';
import { fetchAll, fetchChapterImages } from '../../../../redux/manga/actions';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';
import { CurrentChapter, CurrentChapterImages } from '../../../../redux/manga/reducer';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { useInitialEffect } from '../../../../common/hooks';
import { Header } from '../../../../components/header/Header';
import { navigateToDetail } from '../../../../common/router';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const mangaId = Number(query.mangaId);
  const volumeNumber = Number(query.volumeNumber);
  const chapterNumber = Number(query.chapterNumber);

  if (!(mangaId && volumeNumber && chapterNumber))
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    };
  return {
    props: {
      mangaId,
      volumeNumber,
      chapterNumber,
    },
  };
};

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
};

export default function Read({ mangaId, volumeNumber, chapterNumber }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { current: manga, chapter } = useSelector((state: RootState) => state.manga);
  const [headerImageNumber, setHeaderImageNumber] = useState(0);
  const [mode, setMode] = useState(undefined as ReaderMode | undefined);
  const [showHeader, setShowHeader] = useState(false);
  const dispatch = useDispatch() as TDispatch;

  useInitialEffect(() => {
    if (!manga || !chapter) {
      dispatch(fetchAll({ mangaId, volumeNumber, chapterNumber }));
    } else if (chapter && !chapter?.images) {
      dispatch(fetchChapterImages(chapter.id));
    }
  });

  useEffect(() => {
    if (chapter?.images?.length) {
      const img = new Image();
      img.src = chapter.images[0];
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

  const chapterReady = useMemo(
    () => Boolean(manga && chapter && chapter.number === chapterNumber && chapter.images !== undefined),
    [manga, chapter, chapterNumber]
  );

  // Current chapter.number may differ from chapterNumber in case of replacing route
  return chapterReady ? (
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
                {headerImageNumber} / {chapter.images.length}
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
