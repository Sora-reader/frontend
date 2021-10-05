import { MangaChapter } from '../../../../api/types';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { setCurrentChapter } from '../../../../redux/manga/actions';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { ChapterChip } from './ChapterChip';
import { useAppDispatch } from '../../../../redux/store';

type Props = {
  mangaId: number;
  chapter: MangaChapter;
  index: number;
  chipWidth?: number;
  read?: boolean;
};

export const ChapterItem = memo(({ mangaId, chapter, index, chipWidth, read }: Props) => {
  const dispatch = useAppDispatch();
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
