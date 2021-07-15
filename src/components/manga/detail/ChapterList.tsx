import { MangaChapters } from '../../../utils/apiTypes';
import { List } from '@material-ui/core';
import { ChapterItem } from './ChapterItem';
import { Divider } from '@material-ui/core';
import { memo } from 'react';

type Props = {
  mangaId: number;
  chapters?: MangaChapters;
};

export const ChapterList = memo(({ mangaId, chapters }: Props) => {
  const mappedChapters = chapters?.map((chapter, index) => (
    <ChapterItem key={chapter.title} mangaId={mangaId} chapter={chapter} index={index} />
  ));

  return (
    <List>
      {mappedChapters && mappedChapters.length ? (
        mappedChapters.reduce((prev, curr, index) => (
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
