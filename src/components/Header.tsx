// @flow
import * as React from 'react';
import {FormEvent, useRef, useState} from 'react';
import {
  AppBar,
  createStyles,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {useRouter} from 'next/router';
import {stringifyUrl} from 'query-string';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import {NextLink} from './muiCustoms/CustomLink';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
      drawerWrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      list: {
        paddingTop: theme.spacing(2),
        width: '250px',
      },
    }),
);

export function Header() {
  const classes = useStyles();
  const router = useRouter();
  const nameInput = useRef<HTMLInputElement>();

  let nameInputCurrent = nameInput.current;
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setDrawer(value);
  };

  function submitSearch(e: FormEvent) {
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
        <SwipeableDrawer
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={drawer}>
          <div className={classes.drawerWrapper}>
            <List className={classes.list}>
              <ListItem button href="/" component={NextLink}
                        color="inherit" underline="none"
                        onClick={toggleDrawer(false)}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText>
                  Домой
                </ListItemText>
              </ListItem>
              <ListItem button href="/settings" component={NextLink}
                        color="inherit" underline="none" onClick={toggleDrawer(false)}>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText>
                  Настройки
                </ListItemText>
              </ListItem>
            </List>
            <List className={classes.list}>
              <ListItem button href="/login" component={NextLink}
                        color="inherit" underline="none">
                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                <ListItemText>
                  Вход
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
        <AppBar className={classes.navbar} position={'fixed'}>
          <Toolbar className={classes.toolbar}>
            <IconButton
                onClick={toggleDrawer(true)}
                className={classes.toolbarIcon}>
              <MenuIcon/>
            </IconButton>
            <form onSubmit={submitSearch}>
              <Input name={'name'}
                     id={'search-input'}
                     inputRef={nameInput}
                     className={classes.search}
                     placeholder={'Поиск'}
              />
            </form>
          </Toolbar>
        </AppBar>
      </div>
  );
}