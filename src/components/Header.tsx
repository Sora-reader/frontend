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
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme: Theme) => createStyles({
      navbar: {
        backgroundColor: theme.palette.type === 'dark' ?
            theme.palette.grey['800'] :
            theme.palette.primary.main,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0.5, 1),
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1, 1),
        },
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      toolbarIcon: {},
      search: {
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
  const router = useRouter();
  const nameInput = useRef<HTMLInputElement>();

  let nameInputCurrent = nameInput.current;

  function submitSearch(e: FormEvent): void {
    e.preventDefault();
    nameInputCurrent = nameInput.current;
    if (nameInputCurrent) {
      const name = encodeURI(nameInputCurrent.value);
      router.push({
        pathname: '/search',
        search: '?name=' + name,
      }).then();
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