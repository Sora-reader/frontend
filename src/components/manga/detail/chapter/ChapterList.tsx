import { MangaChapters } from '../../../../api/types';
import { List, Typography } from '@material-ui/core';
import { ChapterItem } from './ChapterItem';
import { Divider } from '@material-ui/core';
import { memo } from 'react';
import { useMemo } from 'react';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

type Props = {
  mangaId?: number;
  chapters?: MangaChapters;
};

export const ChapterList = memo(({ mangaId, chapters }: Props) => {
  const chipWidth = useMemo(() => {
    const len = chapters?.length;
    if (!len || len < 100) return 2.1;
    if (len < 1000) return 2.6;
    return 3;
  }, [chapters]);

  const readChapterMap = useSelector((state: RootState) => state.manga.readChapters);
  const readChapter = useMemo(() => {
    if (!chapters || !mangaId) return;
    const id = readChapterMap ? readChapterMap[mangaId] : undefined;
    if (id) return { id, index: chapters.findIndex((c) => c.id === id) };
  }, [chapters, readChapterMap, mangaId]);

  const readChapters = useMemo(() => {
    if (!chapters || !mangaId) return [];
    if (readChapter && readChapter.index !== undefined) {
      return chapters.slice(readChapter.index);
    }
    return [];
  }, [readChapter, chapters, mangaId]);
  const unreadChapters = useMemo(() => {
    if (!chapters || !mangaId) return [];
    if (readChapter && readChapter.index !== undefined) {
      return chapters.slice(0, readChapter.index);
    }
    return chapters;
  }, [readChapter, chapters, mangaId]);

  const mappedChapters = useMemo(() => {
    if (chapters && mangaId && readChapters && unreadChapters) {
      const read = readChapters?.map((chapter, index) => (
        <ChapterItem
          key={chapter.link}
          mangaId={mangaId}
          chapter={chapter}
          index={chapters.length - index}
          chipWidth={chipWidth}
          read={true}
        />
      ));
      const unread = unreadChapters?.map((chapter, index) => (
        <ChapterItem
          key={chapter.link}
          mangaId={mangaId}
          chapter={chapter}
          index={chapters.length - index}
          chipWidth={chipWidth}
        />
      ));
      return unread.concat(read);
    }
    return [];
  }, [mangaId, chipWidth, chapters, readChapters, unreadChapters]);

  if (!mangaId || !chapters) {
    return (
      <List>
        {Array.from(Array(17), (_, i) => (
          <Skeleton key={i} width="100%">
            <ChapterItem chapter={{} as any} mangaId={0} index={0} />
          </Skeleton>
        ))}
      </List>
    );
  }

  return (
    <List>
      {chapters.length ? (
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
