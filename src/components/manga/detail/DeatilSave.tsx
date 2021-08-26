import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Divider, IconButton, Link, Typography } from '@material-ui/core';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../utils/apiTypes';
import { MangaRating } from '../MangaRating';
import { memo, useCallback } from 'react';
import { Skeleton } from '@material-ui/lab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { favor, unfavor } from '../../../redux/saveLists/actions';

type Props = {
  manga: Manga;
};

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    heart: {
      color: '#e3344e',
    },
  })
);

export const DetailSave = ({ manga }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(undefined as boolean | undefined);
  const setFavorite = useCallback(() => {
    if (isFavorite) dispatch(dispatch(unfavor(manga)));
    else dispatch(dispatch(favor(manga)));

    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  return (
    <div>
      <IconButton onClick={setFavorite}>
        {isFavorite ? <FavoriteIcon className={classes.heart} /> : <FavoriteBorderIcon className={classes.heart} />}
      </IconButton>
    </div>
  );
};
