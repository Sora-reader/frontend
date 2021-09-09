import { MangaChapter } from '../../../../common/apiTypes';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { setCurrentChapter } from '../../../../redux/manga/actions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { TDispatch } from '../../../../redux/types';
import { memo } from 'react';
import { ChapterChip } from './ChapterChip';

type Props = {
  mangaId: number;
  chapter: MangaChapter;
  index: number;
  chipWidth?: number;
  read?: boolean;
};

export const ChapterItem = memo(({ mangaId, chapter, index, chipWidth, read }: Props) => {
  const dispatch = useDispatch() as TDispatch;
  const router = useRouter();

  // Don't need to use useCallback as it's memo
  const passChapterCallback = () => {
    dispatch(setCurrentChapter(chapter));
    router.push(`/read/${mangaId}/${chapter.volume}/${chapter.number}/`);
  };

  return (
    <ListItem button onClick={passChapterCallback} alignItems="flex-start">
      <ListItemText>
        <ChapterChip chipWidth={chipWidth} value={index} variant={(read && 'outlined') || 'default'} />
        <span>{chapter.title || ''}</span>
      </ListItemText>
    </ListItem>
  );
});
