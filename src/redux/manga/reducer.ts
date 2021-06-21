import { createReducer } from '@reduxjs/toolkit';
import { MangaType } from '../../catalogs/baseCatalog';
import { setManga, loadLastVisitedManga, pushLastVisitedManga } from './actions';

type StateType = {
  manga: MangaType;
  lastVisited: Array<MangaType>;
};

const initialState: StateType = {
  manga: { title: '', link: '', imageUrl: '' },
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
    let newLastVisited = state.lastVisited.filter((element) => element.link !== action.payload.link);
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
