import { createReducer } from '@reduxjs/toolkit';
import { Manga, MangaChapter, MangaChapterImages, MangaList } from '../../utils/apiTypes';
import {
  setCurrentManga,
  loadViewedManga,
  pushViewedManga,
  fetchMangaDetail,
  fetchMangaChapters,
  setCurrentChapter,
  fetchChapterImages,
} from './actions';

export type CurrentChapterImages = { images?: MangaChapterImages };
export type CurrentChapter = MangaChapter & CurrentChapterImages;

type StateType = {
  current: Manga;
  chapter?: CurrentChapter;
  viewed: MangaList;
};

const initialState: StateType = {
  current: { id: -1, title: '', description: '' },
  viewed: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentManga, (state, action) => {
    state.current = action.payload;
  });
  builder.addCase(setCurrentChapter, (state, action) => {
    state.chapter = action.payload;
  });
  builder.addCase(fetchChapterImages.fulfilled, (state, action) => {
    if (state.chapter) state.chapter.images = action.payload;
  });
  builder.addCase(fetchMangaDetail.fulfilled, (state, action) => {
    state.current = { ...state.current, ...action.payload };
  });
  builder.addCase(fetchMangaChapters.fulfilled, (state, action) => {
    state.current.chapters = action.payload;
  });
  builder.addCase(loadViewedManga, (state, action) => {
    state.viewed = action.payload;
  });
  builder.addCase(pushViewedManga, (state, action) => {
    let newViewed = state.viewed.filter((element) => element.id !== action.payload.id);
    newViewed.unshift(action.payload);
    // If some values were removed after filter
    while (newViewed.length > 3) {
      newViewed.pop();
    }

    state.viewed = newViewed;
  });
});

export default reducer;
