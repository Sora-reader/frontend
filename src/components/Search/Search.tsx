// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  Avatar,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import {searchItems} from './logic';
import {ListDataType} from '../../config/ReadManga';

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme: Theme) => createStyles(({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
  },
  header: {
    textAlign: 'center',
  },
  list: {
    padding: theme.spacing(3, 1),
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '8rem',
  },
  listItemAvatar: {
    height: '100%',
    width: '15%',
    margin: 0,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  descContainer: {
    width: '100%',
    padding: theme.spacing(1),
  },
  mangaTitle: {
    '& span': {
      fontSize: 'x-large',
    },
  },
  author: {
    color: theme.palette.grey.A100,
  },
  descFooter: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  genreList: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  rating: {},
  genre: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    borderRadius: 5,
    backgroundColor: theme.palette.primary.dark,
  },
})));

export function Search() {
  const classes = useStyles();

  const query = String(useQuery().get('name'));

  const initialState: ListDataType = {results: 0, invalidResults: 0, items: []};
  const [listData, setListData] = useState(initialState);

  useEffect(() => {
    searchItems(query, setListData);
  }, [query]);

  return (
      <div className={classes.root}>
        <h1 className={classes.header}>Итог поиска по запросу: "{query}"</h1>
        <List className={classes.list}> {
          listData.items.map(item => {
            return <ListItem button
                             component={'a'}
                             href={item.link}
                             key={item.link}
                             alignItems={'flex-start'}
                             className={classes.listItem}>
              <ListItemAvatar className={classes.listItemAvatar}>
                <Avatar variant={'rounded'}
                        src={item.imageUrl}
                        className={classes.avatar}/>
              </ListItemAvatar>
              <div className={classes.descContainer}>
                <div className={classes.descFooter}>
                  <ListItemText className={classes.mangaTitle}>
                    {item.title}
                  </ListItemText>
                  <Rating readOnly
                          precision={0.1}
                          className={classes.rating}
                          value={item.starRate ? item.starRate / 2 : 0}/>
                </div>
                <ListItemText className={classes.author}>
                  {item.author}
                </ListItemText>
                <ListItemText className={classes.genreList}>
                  {item.genres?.map(genre => {
                    return (
                        <span key={genre} className={classes.genre}>
                            {genre}
                        </span>
                    );
                  })}
                </ListItemText>
              </div>
            </ListItem>;
          })
        }
        </List>
      </div>
  );
}