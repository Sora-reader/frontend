import { FormEvent, useRef, useState } from 'react';
import { createStyles, Input, makeStyles, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import { HeaderDrawer } from './HeaderDrawer';
import { Header } from './Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    header: {
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.5, 1),
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 1),
      },
    },
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

export const searchInputId = 'search-input';

export function NavigationHeader() {
  const classes = useStyles();
  const router = useRouter();

  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (value: boolean) => () => {
    setDrawer(value);
  };

  const searchInputRef = useRef<HTMLInputElement>();

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const nameInputCurrent = searchInputRef?.current;
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
      <HeaderDrawer drawer={drawer} toggleDrawer={toggleDrawer} />
      <Header
        className={classes.header}
        icon={<MenuIcon />}
        onIconClick={toggleDrawer(true)}
        position="sticky"
        classes={{ toolbar: classes.toolbar }}
      >
        <form onSubmit={submitSearch} autoComplete="off">
          <Input
            name="name"
            id={searchInputId}
            inputRef={searchInputRef}
            className={classes.search}
            placeholder="Поиск"
          />
        </form>
      </Header>
    </>
  );
}
