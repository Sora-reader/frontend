export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';

interface SignInAction {
  type: typeof SIGN_IN;
  username: string;
  token: string;
}

interface SignInErrorAction {
  type: typeof SIGN_IN_ERROR;
  error: string;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SignUpAction {
  type: typeof SIGN_UP;
  username: string;
  password: string;
}

export type UserAction =
  | SignInAction
  | SignInErrorAction
  | SignOutAction
  | SignUpAction;

export const signIn = (username: string, password: string): SignInAction => {
  // TODO
  return {
    type: SIGN_IN,
    username,
    token: password,
  };
};
export const signInError = (error: string): SignInErrorAction => ({
  type: SIGN_IN_ERROR,
  error,
});

export const signOut = (): SignOutAction => {
  // TODO clear cookies
  return { type: SIGN_OUT };
};
export const signUp = (username: string, password: string): SignUpAction => ({
  type: SIGN_UP,
  username,
  password,
});
