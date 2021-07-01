import { FormEvent, ReactNode, useState } from 'react';
import { useEffect, useRef } from 'react';
import { Button, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { Alert } from '@material-ui/lab';
import { unwrapResult } from '@reduxjs/toolkit';

// TODO: use formik?
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    submit: {
      marginTop: theme.spacing(3),
    },
  })
);

type Props = {
  headerText: string;
  submitText: string;
  toDispatch: Function;
  afterSuccess: Function;
  tip?: ReactNode;
};

export const UserCredentialsForm = ({ headerText, submitText, toDispatch, afterSuccess, tip }: Props) => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, any, AnyAction>;
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const username = String(data.get('username'));
    const password = String(data.get('password'));

    // Success
    dispatch(toDispatch({ username, password }))
      .then(unwrapResult)
      .then(afterSuccess)
      .catch(() => setErrorMessage('Произошла ошибка, проверьте введённые данные'));
  };

  return (
    <div>
      <Typography align="center" gutterBottom component="h3" variant="h3">
        {headerText}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {errorMessage ? (
          <Alert severity="error" variant="filled">
            {errorMessage}
          </Alert>
        ) : (
          ''
        )}
      </div>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField label="Имя пользователя" name="username" type="username" variant="standard" inputRef={inputRef} />
          <TextField name="password" type="password" label="Пароль" variant="standard" />
          {tip ? tip : ''}
          <Button type="submit" className={classes.submit}>
            {submitText}
          </Button>
        </form>
      </div>
    </div>
  );
};
