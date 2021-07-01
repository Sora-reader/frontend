import { useEffect } from 'react';
import { Box, createStyles, Divider, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MangaDetailHeader } from '../../components/manga/detail/MangaDetailHeader';
import { MangaDetailDescription } from '../../components/manga/detail/MangaDetailDescription';
import { RootState } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaDetail, pushLastVisitedManga } from '../../redux/manga/actions';
import { Manga } from '../../api/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { TDispatch } from '../../redux/types';
import { GetServerSideProps } from 'next';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  return {
    props: { mangaId: Number(context.params?.id) },
  };
};
type Props = {
  mangaId: Number;
};

export default function Detail({ mangaId }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const manga: Manga = useSelector((state: RootState) => state.manga.currentManga);
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    console.log(mangaId, router.query.id);
    if (!mangaId) {
      console.log('No data');
      router.push('/search');
    } else {
      if (manga.id) {
        dispatch(pushLastVisitedManga(manga));
      }

      let retryCounter = 2;
      const retryIfNeeded = (data: Manga) => {
        if (data.detailNeedsUpdate && retryCounter)
          setTimeout(() => {
            retryCounter -= 1;
            dispatch(pushLastVisitedManga(manga));
            dispatch(fetchMangaDetail(mangaId)).then(unwrapResult).then(retryIfNeeded);
          }, 2000);
      };
      dispatch(fetchMangaDetail(mangaId)).then(unwrapResult).then(retryIfNeeded);
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
        Список глав
      </Box>,
    ],
  ] as Array<[String, JSX.Element]>;

  return (
    <div className={classes.root}>
      <SwipeableTabs panels={panels} />
    </div>
  );
}
