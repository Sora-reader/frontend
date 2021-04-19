import axios from 'axios';
import { REFRESH_USER, SET_USER, RESET_USER_ACTION } from './actions';
import { UserAction } from './types';

type StateType = {
  username: string;
  access: string;
};
const initialState: StateType = {
  username: '',
  access: '',
};

const reducer = (state = initialState, action: UserAction): StateType => {
  switch (action.type) {
    case REFRESH_USER:
      return {
        ...state,
        access: action.access ? action.access : state.access,
      };
    case SET_USER:
      return {
        ...state,
        username: action.username,
        access: action.access,
      };
    case RESET_USER_ACTION:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
