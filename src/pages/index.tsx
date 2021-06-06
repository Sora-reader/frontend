import React, { createStyles, List, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SearchItem } from '../components/views/search/SearchItem';
import { State } from '../redux/store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      minHeight: '100vh',
    },
    lastVisited: {
      padding: theme.spacing(0, 1),
      textAlign: 'center',
    },
  })
);

export default function IndexView() {
  const classes = useStyles();
  const lastVisited = useSelector((state: State) => state.manga.lastVisited);

  return (
    <div className={classes.root}>
      <h1 className={classes.lastVisited}>Недавно просмотренные</h1>
      <List>
        {lastVisited.map((element) => (
          <SearchItem key={element.link} data={element} />
        ))}
      </List>
    </div>
  );
}
