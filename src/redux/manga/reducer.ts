import { createReducer } from '@reduxjs/toolkit';
import { Manga, MangaChapter, MangaChapterImages, MangaList } from '../../api/types';
import {
  setMangaPreview,
  loadLastVisitedManga,
  pushLastVisitedManga,
  fetchMangaDetail,
  fetchMangaChapters,
  setCurrentChapter,
  fetchChapterImages,
} from './actions';

type StateType = {
  currentManga: Manga;
  currentChapter?: MangaChapter & { images?: MangaChapterImages };
  lastVisited: MangaList;
};

const initialState: StateType = {
  currentManga: { id: -1, title: '', description: '' },
  lastVisited: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMangaPreview, (state, action) => {
    state.currentManga = action.payload;
  });
  builder.addCase(setCurrentChapter, (state, action) => {
    state.currentChapter = action.payload;
  });
  builder.addCase(fetchChapterImages.fulfilled, (state, action) => {
    if (state.currentChapter) state.currentChapter.images = action.payload;
  });
  builder.addCase(fetchMangaDetail.fulfilled, (state, action) => {
    state.currentManga = action.payload;
  });
  builder.addCase(fetchMangaChapters.fulfilled, (state, action) => {
    state.currentManga.chapters = action.payload;
    console.log('Set chapters');
  });
  builder.addCase(loadLastVisitedManga, (state, action) => {
    state.lastVisited = action.payload;
  });
  builder.addCase(pushLastVisitedManga, (state, action) => {
    let newLastVisited = state.lastVisited.filter((element) => element.id !== action.payload.id);
    newLastVisited.unshift(action.payload);
    // If some values were removed after filter
    while (newLastVisited.length > 3) {
      console.log('Popping');
      newLastVisited.pop();
    }

    state.lastVisited = newLastVisited;
  });
});

export default reducer;
