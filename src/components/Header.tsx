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

export function Header() {
  const classes = useStyles();
  const history = useHistory();
  const nameInput = useRef<HTMLInputElement>();

  let nameInputCurrent = nameInput.current;

  function submitSearch(e: FormEvent): void {
    e.preventDefault();
    nameInputCurrent = nameInput.current;
    if (nameInputCurrent) {
      const name = encodeURI(nameInputCurrent.value);
      history.push({
        pathname: '/search',
        search: '?name=' + name,
      });
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