import { MangaChapters } from '../../../../utils/apiTypes';
import { List, Typography } from '@material-ui/core';
import { ChapterItem } from './ChapterItem';
import { Divider } from '@material-ui/core';
import { memo } from 'react';
import { useMemo } from 'react';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

type Props = {
  mangaId: number;
  chapters?: MangaChapters;
};

export const ChapterList = memo(({ mangaId, chapters }: Props) => {
  const chipWidth = useMemo(() => {
    if (!chapters) return;
    const len = chapters.length;
    if (len < 100) return 2.1;
    if (len < 1000) return 2.6;
    return 3;
  }, [chapters]);

  const readChapterMap = useSelector((state: RootState) => state.manga.readChapters);
  const readChapter = useMemo(() => {
    const id = readChapterMap ? readChapterMap[mangaId] : undefined;
    if (id) return { id, index: chapters?.findIndex((c) => c.id === id) };
  }, [chapters, readChapterMap, mangaId]);

  const readChapters = useMemo(() => {
    if (readChapter && readChapter.index !== undefined) {
      return chapters?.slice(readChapter.index);
    }
    return [];
  }, [readChapter, chapters]);
  const unreadChapters = useMemo(() => {
    if (readChapter && readChapter.index !== undefined) {
      return chapters?.slice(0, readChapter.index);
    }
    return chapters;
  }, [readChapter, chapters]);

  const mappedChapters = useMemo(() => {
    if (chapters && readChapters && unreadChapters) {
      const read = readChapters?.map((chapter, index) => (
        <ChapterItem
          key={chapter.link}
          mangaId={mangaId}
          chapter={chapter}
          index={chapters?.length - index}
          chipWidth={chipWidth}
          read={true}
        />
      ));
      const unread = unreadChapters?.map((chapter, index) => (
        <ChapterItem
          key={chapter.link}
          mangaId={mangaId}
          chapter={chapter}
          index={chapters?.length - index}
          chipWidth={chipWidth}
        />
      ));
      return unread.concat(read);
    }
    return [];
  }, [mangaId, chipWidth, chapters, readChapters, unreadChapters]);

  return (
    <List>
      {chapters && chapters?.length ? (
        mappedChapters.reduce((prev, curr) => (
          // Reduce to place dividers between chapters, can't use join with JSX
          <>
            {prev}
            <Divider />
            {curr}
          </>
        ))
      ) : (
        <Typography variant="h5" align="center">
          Главы не найдены
        </Typography>
      )}
    </List>
  );
});
