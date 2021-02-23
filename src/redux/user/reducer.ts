import {SIGN_IN, SIGN_OUT, UserAction} from './action';

type StateType = {
  username: string,
  token: string,
}
const initialState: StateType = {
  username: '',
  token: '',
};

const reducer = (state = initialState, action: UserAction): StateType => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        username: action.username,
        token: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;