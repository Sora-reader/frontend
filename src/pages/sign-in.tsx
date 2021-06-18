import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Button, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signIn } from '../redux/user/actions';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    formWrapper: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(3),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(2),
      width: '40%',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    formInputs: {},
    formHeader: {
      marginBottom: theme.spacing(3),
    },
    formSubmit: {
      marginTop: theme.spacing(3),
    },
  })
);

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch() as ThunkDispatch<RootState, any, AnyAction>;

  const inputRef = useRef<HTMLInputElement>();

  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);

  if (currentUser.access) {
    router.push('/').then(null);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const username = String(data.get('username'));
    const password = String(data.get('password'));

    // Success
    dispatch(signIn(username, password)).then(() => {
      console.log;
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography className={classes.formHeader} align="center" component="h3" variant="h3">
            Вход
          </Typography>
          <TextField label="Имя пользователя" name="username" type="username" variant="standard" inputRef={inputRef} />
          <TextField name="password" type="password" label="Пароль" variant="standard" />
          <Button type="submit" className={classes.formSubmit}>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
