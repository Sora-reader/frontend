import { createReducer } from '@reduxjs/toolkit';
import { refreshAxiosDefaults } from '../../common/axios/utils';
import { signIn, signOut, signUp, refreshUser } from './actions';

type StateType = {
  username: string;
  access: string;
};
const initialState: StateType = {
  username: '',
  access: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signOut.fulfilled, () => {
    return initialState;
  });
  builder.addCase(refreshUser.fulfilled, (state, action) => {
    state.access = action.payload;
  });
  builder.addMatcher(
    (action) => signIn.fulfilled.match(action) || signUp.fulfilled.match(action),
    (state, action) => {
      return { ...state, ...action.payload };
    }
  );
  builder.addMatcher(
    () => true,
    (state) => refreshAxiosDefaults(state.access)
  );
});

export default reducer;
