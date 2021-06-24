import { createReducer } from '@reduxjs/toolkit';
import { Manga, MangaList } from '../../api/types';
import { setManga, loadLastVisitedManga, pushLastVisitedManga } from './actions';

type StateType = {
  manga: Manga;
  lastVisited: MangaList;
};

const initialState: StateType = {
  manga: { id: -1, title: '', description: '' },
  lastVisited: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setManga, (state, action) => {
    state.manga = action.payload;
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
