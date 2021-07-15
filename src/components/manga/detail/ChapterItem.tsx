import { MangaChapter } from '../../../utils/apiTypes';
import { createStyles, ListItem, makeStyles, Theme } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { setCurrentChapter } from '../../../redux/manga/actions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { TDispatch } from '../../../redux/types';
import { memo } from 'react';
import { SoraChip } from '../../SoraChip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      opacity: 0.9,
    },
  })
);

type Props = {
  mangaId: number;
  chapter: MangaChapter;
  index: number;
};

export const ChapterItem = memo(({ mangaId, chapter, index }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch() as TDispatch;
  const router = useRouter();

  // Don't need to use useCallback as it's memo
  const passChapterCallback = () => {
    dispatch(setCurrentChapter(chapter));
    router.push(`/read/${mangaId}/${chapter.volume}/${chapter.number}/`);
  };

  return (
    <ListItem button key={chapter.link} onClick={passChapterCallback} alignItems="flex-start">
      <ListItemText>
        <SoraChip label={index + 1} style={{ margin: '0 1rem 0 0' }} variant="outlined" size="small" />
        <span>{chapter.title || ''}</span>
      </ListItemText>
    </ListItem>
  );
});
