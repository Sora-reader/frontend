import { useEffect } from 'react';
import { Box, createStyles, Divider, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MangaDetailHeader } from '../../components/manga/detail/MangaDetailHeader';
import { MangaDetailDescription } from '../../components/manga/detail/MangaDetailDescription';
import { RootState } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import {
  fetchMangaChapters,
  fetchMangaDetail,
  pushLastVisitedManga,
} from '../../redux/manga/actions';
import { Manga } from '../../api/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { TDispatch } from '../../redux/types';
import { GetServerSideProps } from 'next';
import { chaptersNeedUpdate } from '../../redux/manga/utils';
import { ChapterList } from '../../components/manga/detail/ChapterList';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { mangaId: Number(context.params?.id) },
  };
};
type Props = {
  mangaId: Number;
};

const fetchRetry = (
  shouldRetry: (data: any) => boolean,
  dispatchCall: () => Promise<any>,
  onSuccess?: Function,
  maxRetries: number = 2,
  timeout: number = 2000
) => {
  /**
   * A function to retry calls if data is outdated
   * @param shouldRetry how to check if should retry
   * @param onSuccess a callback to run when data was fetched
   */
  let retryCounter = maxRetries;
  const retryIfNeeded = (data: any) => {
    if (shouldRetry(data) && retryCounter) {
      setTimeout(() => {
        retryCounter -= 1;
        dispatchCall().then(retryIfNeeded);
      }, timeout);
    }
    if (onSuccess) onSuccess();
  };
  dispatchCall().then(retryIfNeeded);
};

export default function Detail({ mangaId }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const manga: Manga = useSelector((state: RootState) => state.manga.currentManga);
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    if (!mangaId) {
      console.log('No data');
      router.push('/search');
    } else {
      if (manga.id) {
        dispatch(pushLastVisitedManga(manga));
      }

      fetchRetry(
        (data) => !data.detailDataFresh,
        () => dispatch(fetchMangaDetail(mangaId)).then(unwrapResult),
        () => dispatch(pushLastVisitedManga(manga))
      );

      if (chaptersNeedUpdate(manga)) {
        fetchRetry(
          (data) => !data.length,
          () => dispatch(fetchMangaChapters(mangaId)).then(unwrapResult)
        );
      } else {
        dispatch(fetchMangaChapters(mangaId)).then(unwrapResult);
      }
    }
  }, []);

  const panels = [
    [
      'Описание',
      <Box key={1} p={2}>
        <MangaDetailHeader {...manga} />
        <Divider />
        <MangaDetailDescription text={String(manga.description)} />
      </Box>,
    ],
    [
      'Главы',
      <Box key={2} p={2}>
        <ChapterList mangaId={manga.id} chapters={manga.chapters} />
      </Box>,
    ],
  ] as Array<[String, JSX.Element]>;

  return (
    <div className={classes.root}>
      <SwipeableTabs panels={panels} />
    </div>
  );
}
