import { createReducer } from '@reduxjs/toolkit';
import { MangaList } from '../../api/types';
import { loadViewedManga, pushViewedManga, setRead } from './actions';

type StateType = {
  viewed: MangaList;
  readChapters: Record<number, number>;
};

const initialState: StateType = {
  viewed: [],
  readChapters: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setRead, (state, action) => {
    state.readChapters[action.payload.mangaId] = action.payload.chapterId;
  });

  // Viewed
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
