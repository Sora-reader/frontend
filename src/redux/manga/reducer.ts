import { MangaType } from '../../catalogs/baseCatalog';
import { SET_MANGA } from './actions';
import { MangaAction } from './types';

type StateType = {
  manga: MangaType;
};

const initialState: StateType = {
  manga: { title: '', link: '', imageUrl: '' },
};

export default function reducer(state = initialState, action: MangaAction): StateType {
  switch (action.type) {
    case SET_MANGA:
      return {
        ...state,
        manga: action.manga,
      };
    default:
      return state;
  }
}
