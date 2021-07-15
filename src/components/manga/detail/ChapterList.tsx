import { MangaChapters } from '../../../utils/apiTypes';
import { List } from '@material-ui/core';
import { ChapterItem } from './ChapterItem';
import { Divider } from '@material-ui/core';
import { memo } from 'react';
import { useMemo } from 'react';

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

  const mappedChapters = chapters?.map((chapter, index) => (
    <ChapterItem
      key={chapter.title}
      mangaId={mangaId}
      chapter={chapter}
      index={chapters.length - index}
      chipWidth={chipWidth}
    />
  ));

  return (
    <List>
      {mappedChapters && mappedChapters.length ? (
        mappedChapters.reduce((prev, curr) => (
          // Reduce to place dividers between chapters, can't use join with JSX
          <>
            {prev}
            <Divider />
            {curr}
          </>
        ))
      ) : (
        <p>Список глав пуст</p>
      )}
    </List>
  );
});
