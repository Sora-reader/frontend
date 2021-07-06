import { useCallback, useEffect, useMemo, useState } from 'react';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../redux/store';
import {
  fetchChapterImages,
  fetchMangaChapters,
  fetchMangaDetail,
  setCurrentChapter,
} from '../../../../redux/manga/actions';
import { TDispatch } from '../../../../redux/types';
import { GetServerSideProps } from 'next';
import { Avatar } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { MangaChapterImages, MangaChapters } from '../../../../utils/apiTypes';
import { useKeyboardScroll } from '../../../../utils/reader/scrollHandler';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      padding: 'auto',
    },
    swipeContainer: {
      margin: 'auto',
      minHeight: '100vh',
    },
    chapterImage: {
      height: '100%',
      width: '100%',
    },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mangaId: Number(context.query.mangaId),
      volumeNumber: Number(context.query.volumeNumber),
      chapterNumber: Number(context.query.chapterNumber),
    },
  };
};

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
};

const fetchAll = (dispatch: TDispatch, mangaId: number, volumeNumber: number, chapterNumber: number) => {
  dispatch(fetchMangaDetail(mangaId))
    .then(unwrapResult)
    .then(async () => {
      const chapters = await dispatch(fetchMangaChapters(mangaId));
      const currentChapter = (chapters.payload as MangaChapters).find((chapter) => {
        return chapter.volume === volumeNumber && chapter.number === chapterNumber;
      });
      if (currentChapter) {
        await dispatch(setCurrentChapter(currentChapter));
        await dispatch(fetchChapterImages(currentChapter.id));
      }
    });
};

const roundBinary = (value: number) => (value ? (value * 1) / Math.abs(value) : value);
const getValidImageNumber = (images?: MangaChapterImages) =>
  useCallback((value: number) => (0 <= value && value < (images?.length || -1) ? value : undefined), [images]);

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export default function Detail({ mangaId, volumeNumber, chapterNumber }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const manga = useSelector((state: RootState) => state.manga.currentManga);
  const chapter = useSelector((state: RootState) => state.manga.currentChapter);
  const dispatch = useDispatch() as TDispatch;
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = getValidImageNumber(chapter?.images);

  useKeyboardScroll(chapter?.images);

  useEffect(() => {
    const viewport = document.getElementById('viewport');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    if (!(mangaId && volumeNumber && chapterNumber)) {
      router.push('/search');
    } else if (!chapter) {
      fetchAll(dispatch, mangaId, volumeNumber, chapterNumber);
    } else if (chapter && !chapter?.images) {
      dispatch(fetchChapterImages(chapter.id));
      setCurrentImage(currentImage + 1);
    }

    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=0');
      }
    };
  }, []);

  const nextChapterLink = useMemo(() => {
    if (!manga.chapters) return;
    const nextChapter = manga.chapters.find((chapter) => {
      return chapter.volume === volumeNumber && chapter.number === chapterNumber + 1;
    });
    if (nextChapter) {
      return `/read/${mangaId}/${volumeNumber}/${chapterNumber + 1}`;
    }
  }, [manga, chapter]);

  useEffect(() => {
    if (chapter?.images) {
      const img = new Image();
      img.src = chapter?.images[currentImage];
      if (validImageNumber(currentImage + 1)) {
        const imgNext = new Image();
        imgNext.src = chapter?.images[currentImage + 1];
      }
    }
  }, [chapter?.images, currentImage]);

  const onChangeIndex = useCallback(
    (newIndex, prevIndex) => {
      if (!chapter?.images || Math.abs(prevIndex - newIndex) === chapter.images.length - 1) return;
      const diff = roundBinary(newIndex - prevIndex);
      const newNumber = validImageNumber(currentImage + diff);
      console.log(currentImage + diff);
      console.log(chapter.images.length, nextChapterLink);
      if (newNumber !== undefined) {
        setCurrentImage(newNumber);
        window.scroll({ top: 0 });
      }
      // TODO: chapter swipe
    },
    [chapter?.images, currentImage, setCurrentImage]
  );

  // TODO: Align center (should make header position fixed and scrollable probably)
  // TODO: Nicer progress with XHR
  return (
    <div className={classes.root}>
      {chapter?.images ? (
        <BindKeyboardSwipeableViews
          className={classes.swipeContainer}
          hysteresis={0.5}
          threshold={20}
          index={currentImage}
          onChangeIndex={onChangeIndex}
        >
          {chapter.images.map((image, index) => {
            if (index === currentImage) {
              return <Avatar key={image} variant="square" className={classes.chapterImage} src={image} />;
            }
            return <CircularProgress key={image} />;
          })}
        </BindKeyboardSwipeableViews>
      ) : (
        ''
      )}
    </div>
  );
}
