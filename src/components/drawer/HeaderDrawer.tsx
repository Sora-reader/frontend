import { MutableRefObject, ReactEventHandler, useEffect, useState } from 'react';
import { createStyles, List, makeStyles, SwipeableDrawer, Theme } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DrawerItem } from './DrawerItem';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

type Props = {
  drawer: boolean;
  toggleDrawer: (value: boolean) => ReactEventHandler;
  menuRef: MutableRefObject<HTMLAnchorElement | undefined>;
};

export const HeaderDrawer = ({ drawer, toggleDrawer, menuRef }: Props) => {
  const [drawerSwipeAreaWidth, setDrawerSWA] = useState(20);
  const user = useSelector((state: RootState) => state.user);
  const classes = useStyles();

  useEffect(() => {
    // Drawer area should end where menu button starts
    if (menuRef?.current) setDrawerSWA(window.scrollX + menuRef.current.getBoundingClientRect().left);
  }, [menuRef]);

  return (
    <SwipeableDrawer
      swipeAreaWidth={drawerSwipeAreaWidth}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={drawer}
    >
      <div className={classes.drawerWrapper}>
        <List className={classes.list}>
          <DrawerItem href="/" text="Домой" icon={<HomeIcon />} toggleDrawer={toggleDrawer} />
          <DrawerItem href="/settings" text="Настройки" icon={<SettingsIcon />} toggleDrawer={toggleDrawer} />
        </List>
        <List className={classes.list}>
          {user.access ? (
            <>
              {/* TODO: User profile */}
              <DrawerItem href="/" text={user.username} icon={<AccountBoxIcon />} toggleDrawer={toggleDrawer} />
              <DrawerItem href="/sign-out" text="Выйти" icon={<ExitToAppIcon />} toggleDrawer={toggleDrawer} />
            </>
          ) : (
            <DrawerItem href="/sign-in" text="Вход" icon={<AccountBoxIcon />} toggleDrawer={toggleDrawer} />
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};
