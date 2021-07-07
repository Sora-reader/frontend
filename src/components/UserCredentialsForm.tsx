import { ReactNode, useState } from 'react';
import { Button, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { Alert } from '@material-ui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import * as yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(5),
    },
    formWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
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

const validationSchema = yup.object({
  username: yup.string().required('Имя пользователя обязательно'),
  password: yup.string().min(8, 'Пароль должен содержать минимум 8 символов').required('Пароль обязателен'),
});

export const UserCredentialsForm = ({ headerText, submitText, toDispatch, afterSuccess, tip }: Props) => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, any, AnyAction>;
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ username, password }) => {
      dispatch(toDispatch({ username, password }))
        .then(unwrapResult)
        .then(afterSuccess)
        .catch(() => setErrorMessage('Произошла ошибка, проверьте введённые данные'));
    },
  });
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className={classes.root}>
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
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            label="Имя пользователя"
            name="username"
            type="username"
            variant="standard"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            name="password"
            type="password"
            label="Пароль"
            margin="normal"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {tip ? tip : ''}
          <Button type="submit" className={classes.submit}>
            {submitText}
          </Button>
        </form>
      </div>
    </div>
  );
};
