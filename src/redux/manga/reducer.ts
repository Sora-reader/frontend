import {MangaType} from '../../catalogs/baseCatalog';
import {MangaActionTypes, SET_MANGA} from './action';

type StateType = {
  manga: MangaType
}

const initialState: StateType = {
  manga: {title: '', link: '', imageUrl: ''},
};

export default function reducer(
    state = initialState,
    action: MangaActionTypes): StateType {
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