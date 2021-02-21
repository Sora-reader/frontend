import {MangaType} from '../../catalogs/baseCatalog';
import {State} from '../store';
import {AnyAction} from 'redux';
import {mangaActionTypes, SetMangaAction} from './action';

type StateType = {
  manga: MangaType
}

const initialState: StateType = {
  manga: {title: '', link: '', imageUrl: ''},
};

export default function reducer(
    state = initialState,
    action: SetMangaAction | AnyAction) {
  switch (action.type) {
    case mangaActionTypes.SET_MANGA:
      return {
        ...state,
        manga: action.manga,
      };
    default:
      return state;
  }
}