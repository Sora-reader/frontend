// @flow
import * as React from 'react';
import {FormEvent, useRef} from 'react';
import {
  AppBar,
  createStyles,
  IconButton,
  Input,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';

type Props = {};

const useStyles = makeStyles((theme: Theme) => createStyles({
      navbar: {
        backgroundColor: theme.palette.secondary.light,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0.5, 1),
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1, 1),
        },
      },
      toolbar: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      },
      toolbarIcon: {
        color: 'inherit',
      },
      search: {
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: theme.spacing(1),
        '& input': {
          padding: theme.spacing(1, 3),
        },
      },
    }),
);

export function Header(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const nameInput = useRef();

  function submitSearch(e: FormEvent): void {
    e.preventDefault();
    if (nameInput.current) {
      // @ts-ignore
      const name = encodeURI(nameInput.current.value);
      const path = `/search?name=` + name;
      history.push(path);
    }
  }

  return (
      <div>
        <AppBar className={classes.navbar} position={'sticky'}>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.toolbarIcon}>
              <MenuIcon/>
            </IconButton>
            <form onSubmit={submitSearch}>
              <Input name={'name'}
                     inputRef={nameInput}
                     className={classes.search}
                     placeholder={'Поиск'}/>
            </form>
          </Toolbar>
        </AppBar>
      </div>
  );
}