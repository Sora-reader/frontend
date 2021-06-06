import { MangaType } from '../../catalogs/baseCatalog';
import { LOAD_LAST_VISITED_MANGA, PUSH_LAST_VISITED_MANGA, SET_MANGA } from './actions';
import { MangaAction } from './types';

type StateType = {
  manga: MangaType;
  lastVisited: Array<MangaType>;
};

const initialState: StateType = {
  manga: { title: '', link: '', imageUrl: '' },
  lastVisited: [],
};

export default function reducer(state = initialState, action: MangaAction): StateType {
  switch (action.type) {
    case SET_MANGA:
      return {
        ...state,
        manga: action.manga,
      };
    case PUSH_LAST_VISITED_MANGA:
      let newLastVisited = state.lastVisited.filter((element) => element.link !== action.manga.link);
      // const mangaDidntRepeat = newLastVisited.length === state.lastVisited.length;

      newLastVisited.unshift(action.manga);
      // If some values were removed after filter
      while (newLastVisited.length > 3) {
        console.log('Popping');
        newLastVisited.pop();
      }

      return {
        ...state,
        lastVisited: newLastVisited,
      };
    case LOAD_LAST_VISITED_MANGA:
      return {
        ...state,
        lastVisited: action.mangas,
      };
    default:
      return state;
  }
}
