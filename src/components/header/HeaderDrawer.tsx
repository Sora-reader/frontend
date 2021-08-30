import { ReactEventHandler, useCallback, useState } from 'react';
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Theme,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DrawerItem } from './DrawerItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import { useRouter } from 'next/router';
import { ListType } from '../../redux/saveLists/types';
import { saveList } from '../../core/consts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerWrapper: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    list: {
      paddingTop: theme.spacing(2),
      width: '250px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

type SaveListItemProps = {
  title: string;
  href: ListType;
  icon: JSX.Element;
};

const SaveListItem = ({ title, href, icon }: SaveListItemProps) => {
  const router = useRouter();
  const classes = useStyles();
  const handleClick = useCallback(() => {
    router.push(`/lists/${href}`);
  }, [router, href]);

  return (
    <ListItem button onClick={handleClick} className={classes.nested}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

type Props = {
  drawer: boolean;
  toggleDrawer: (value: boolean) => ReactEventHandler;
};

export const HeaderDrawer = ({ drawer, toggleDrawer }: Props) => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);

  const [listsOpen, setListsOpen] = useState(true);
  const openToggle = useCallback(() => {
    setListsOpen(!listsOpen);
  }, [listsOpen]);

  return (
    <SwipeableDrawer onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} open={drawer}>
      <div className={classes.drawerWrapper}>
        <List className={classes.list}>
          <DrawerItem href="/" text="Домой" icon={<HomeIcon />} toggleDrawer={toggleDrawer} />
          <ListItem button onClick={openToggle}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Списки" />
            {listsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={listsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Object.entries(saveList).map(([listName, map]) => (
                <SaveListItem key={listName} title={map.alt} href={listName as ListType} icon={map.icon} />
              ))}
            </List>
          </Collapse>
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
