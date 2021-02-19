// @flow
import * as React from 'react';
import {useState} from 'react';
import {
  createStyles,
  Divider, List,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from '@material-ui/core';
import {ChangeTheme} from '../components/views/settings/changeTheme';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  sidebar: {
    width: '20%',
  },
  content: {
    padding: theme.spacing(3),
    width: 'auto',
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [menuItem, setMenuItem] = useState(0);

  let component: JSX.Element;
  switch (menuItem) {
    case 0:
      component = <ChangeTheme/>;
      break;
    default:
      component = <ChangeTheme/>;
      break;
  }

  return (
      <div className={classes.root}>
        <div className={classes.sidebar}>
          <List>
            <MenuItem selected={menuItem === 0}>
              Тема
            </MenuItem>
          </List>
        </div>
        <Divider orientation="vertical" flexItem={true}/>
        <div className={classes.content}>
          {component}
        </div>
      </div>
  );
}