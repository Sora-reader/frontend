import React from 'react';
import { useEffect, useRef } from 'react';
import { Button, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/user/actions';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/router';

// TODO: refactor to use same form or even formik
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

export default function SignOut() {
  const classes = useStyles();
  const dispatch = useDispatch() as ThunkDispatch<RootState, any, AnyAction>;
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const username = String(data.get('username'));
    const password = String(data.get('password'));

    // Success
    dispatch(signUp({ username, password })).then(()=>router.push('/'));

  };

  return (
    <div className={classes.root}>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography className={classes.formHeader} align="center" component="h3" variant="h3">
            Регистрация
          </Typography>
          <TextField label="Имя пользователя" name="username" type="username" variant="standard" inputRef={inputRef} />
          <TextField name="password" type="password" label="Пароль" variant="standard" />
          <Button type="submit" className={classes.formSubmit}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}
