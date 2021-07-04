import { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../redux/store';
import { fetchChapterImages } from '../../../../redux/manga/actions';
import { TDispatch } from '../../../../redux/types';
import { GetServerSideProps } from 'next';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
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

export default function Detail({ mangaId, volumeId, chapterId }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const chapter = useSelector((state: RootState) => state.manga.currentChapter);
  const dispatch = useDispatch() as TDispatch;
  const [imageNumber, setImageNumber] = useState(0);

  useEffect(() => {
    if (!(mangaId && volumeId && chapterId)) {
      console.log('No data');
      router.push('/search');
    } else if (chapter && !chapter?.images) {
      dispatch(fetchChapterImages(chapter.id)).then((data) => {
        console.log(data);
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      {chapter?.images ? (
        <img
          src={chapter.images[imageNumber]}
          onClick={() => {
            setImageNumber(imageNumber + 1);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
