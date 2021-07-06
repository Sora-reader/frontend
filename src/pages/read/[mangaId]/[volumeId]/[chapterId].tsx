import { useCallback, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
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
import { MangaChapters } from '../../../../api/types';
import { getScrollClickHandler, getScrollKBHandler } from '../../../../utils/reader/scrollHandler';
import SwipeableViews from 'react-swipeable-views';
const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    chapter: {
      height: '100%',
      width: '100%',
    },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mangaId: Number(context.query.mangaId),
      volumeId: Number(context.query.volumeId),
      chapterId: Number(context.query.chapterId),
    },
  };
};
type Props = {
  mangaId: Number;
  volumeId: Number;
  chapterId: Number;
};

// TODO: Clean up, add spinner on avatar load
export default function Detail({ mangaId, volumeId, chapterId }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const chapter = useSelector((state: RootState) => state.manga.currentChapter);
  const dispatch = useDispatch() as TDispatch;
  const [imageNumber, setImageNumber] = useState(0);
  const imageRef = useRef<any>();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [imageNumber]);

  const onChangeIndex = useCallback((newIndex, prevIndex) => {
    if (!chapter?.images?.length) return;
    const diff = newIndex - prevIndex ? 1 : 0;
    const newNumber = imageNumber + diff;
    if (0 <= newNumber && newNumber < chapter.images.length) setImageNumber(newNumber);
  }, []);

  useEffect(() => {
    if (!(mangaId && volumeId && chapterId)) {
      console.log('No data');
      router.push('/search');
    } else if (!chapter) {
      dispatch(fetchMangaDetail(mangaId))
        .then(unwrapResult)
        .then(async () => {
          const chapters = await dispatch(fetchMangaChapters(mangaId));
          const currentChapter = (chapters.payload as MangaChapters).find((chapter) => {
            return chapter.volume === volumeId && chapter.number === chapterId;
          });
          if (currentChapter) {
            await dispatch(setCurrentChapter(currentChapter));
            console.log(currentChapter);
            await dispatch(fetchChapterImages(currentChapter.id));
          }
        });
    } else if (chapter && !chapter?.images) {
      dispatch(fetchChapterImages(chapter.id)).then((data) => {
        console.log(data);
      });
      setImageNumber((prev) => prev + 1);
    }
  }, []);

  const scrollClickHandler = useCallback(getScrollClickHandler(setImageNumber, chapter?.images), [chapter?.images]);
  const scrollKBHandler = useCallback(getScrollKBHandler(setImageNumber, chapter?.images), [chapter?.images]);

  useEffect(() => {
    document.removeEventListener('keydown', scrollKBHandler);
    document.addEventListener('keydown', scrollKBHandler);
    return () => {
      document.removeEventListener('keydown', scrollKBHandler);
    };
  }, [chapter?.images]);

  return (
    <div className={classes.root}>
      {chapter?.images?.length ? (
        <SwipeableViews hysteresis={0.5} threshold={20} index={imageNumber} onChangeIndex={onChangeIndex}>
          {chapter.images.map((image) => (
            <Avatar
              key={image}
              ref={imageRef}
              variant="square"
              className={classes.chapter}
              src={image}
              onClick={scrollClickHandler}
            />
          ))}
        </SwipeableViews>
      ) : (
        ''
      )}
    </div>
  );
}
