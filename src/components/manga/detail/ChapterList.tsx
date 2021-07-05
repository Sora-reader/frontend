import { MangaChapters } from '../../../api/types';
import { List } from '@material-ui/core';
import { ChapterItem } from './ChapterItem';
import { Divider } from '@material-ui/core';
import { memo } from 'react';

type Props = {
  mangaId: number;
  chapters?: MangaChapters;
};

export const ChapterList = memo(({ mangaId, chapters }: Props) => {
  const mappedChapters = chapters?.map((chapter) => <ChapterItem mangaId={mangaId} chapter={chapter} />);

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
