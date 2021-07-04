import { MangaChapter } from '../../../api/types';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { setCurrentChapter } from '../../../redux/manga/actions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { TDispatch } from '../../../redux/types';
import { memo } from 'react';

type Props = {
  mangaId: number;
  chapter: MangaChapter;
};

export const ChapterItem = memo(({ mangaId, chapter }: Props) => {
  const dispatch = useDispatch() as TDispatch;
  const router = useRouter();

  const passChapterCallback = () => {
    dispatch(setCurrentChapter(chapter));
    router.push(`/read/${mangaId}/${chapter.volume}/${chapter.number}/`);
  };

  return (
    <ListItem button key={chapter.link} onClick={passChapterCallback} alignItems="flex-start">
      <ListItemText>{chapter.title || ''}</ListItemText>
    </ListItem>
  );
});
