import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button, createStyles, LinearProgress, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signIn } from '../redux/user/actions';
import { State } from '../redux/store';
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
  const dispatch = useDispatch() as ThunkDispatch<State, any, AnyAction>;

  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const router = useRouter();
  const currentUser = useSelector((state: State) => state.user);

  if (currentUser.access) {
    router.push('/').then(null);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const progress = loading ? <LinearProgress /> : '';
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);

    const username = String(data.get('username'));
    const password = String(data.get('password'));

    // Success
    dispatch(signIn(username, password)).then(() => {
      console.log;
    });
  };

  return (
    <div className={classes.root}>
      {progress}
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
