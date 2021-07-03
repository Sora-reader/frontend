import { FormEvent, useEffect, useRef, useState } from 'react';
import { AppBar, createStyles, IconButton, Input, makeStyles, Theme, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSearchRef } from '../redux/search/actions';
import { HeaderDrawer } from './drawer/HeaderDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey['800'] : theme.palette.primary.main,
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
  })
);

export function Header() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (value: boolean) => () => {
    setDrawer(value);
  };

  const nameInput = useRef<HTMLInputElement>();
  const menuButtonRef = useRef<any>();
  let nameInputCurrent = nameInput.current;

  useEffect(() => {
    dispatch(setSearchRef(nameInput));
  }, [nameInput]);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    nameInputCurrent = nameInput.current;
    if (nameInputCurrent) {
      const name = encodeURI(nameInputCurrent.value);
      router.push({
        pathname: '/search',
        search: `?name=${name}`,
      });
    }
  }

  return (
    <>
      <HeaderDrawer drawer={drawer} toggleDrawer={toggleDrawer} menuRef={menuButtonRef} />
      <AppBar className={classes.navbar} position="sticky">
        <Toolbar className={classes.toolbar}>
          <IconButton ref={menuButtonRef} onClick={toggleDrawer(true)} className={classes.toolbarIcon}>
            <MenuIcon />
          </IconButton>
          <form onSubmit={submitSearch} autoComplete="off">
            <Input name="name" id="search-input" inputRef={nameInput} className={classes.search} placeholder="Поиск" />
          </form>
        </Toolbar>
      </AppBar>
    </>
  );
}
