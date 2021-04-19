import React, { createStyles, makeStyles, Accordion } from '@material-ui/core';
import { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { State } from '../redux/store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      minHeight: '100vh',
    },
    header: {
      padding: theme.spacing(0, 1),
      textAlign: 'center',
    },
  })
);

export default function IndexView() {
  const classes = useStyles();
  const store = useSelector((state: State)=> state.user.access);
  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Главная страница</h1>
    </div>
  );
}
