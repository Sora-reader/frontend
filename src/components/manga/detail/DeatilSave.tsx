import { createStyles, FormControl, FormHelperText, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Manga } from '../../../common/apiTypes';
import { ChangeEvent, useCallback, useMemo } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, favor, removeFromList, unfavor } from '../../../redux/saveLists/actions';
import { RootState } from '../../../redux/store';
import { inList, inWhichList } from '../../../redux/saveLists/utils';
import { ListType } from '../../../redux/saveLists/types';

type Props = {
  manga: Manga;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginBottom: theme.spacing(1) },
    heart: {
      color: '#e3344e',
    },
    helperText: { marginTop: 0 },
  })
);

export const DetailSave = ({ manga }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const saveLists = useSelector((state: RootState) => state.saveLists);

  const isFavorite = useMemo(() => inList(manga, saveLists.favorite), [saveLists.favorite, manga]);
  const setFavorite = useCallback(() => {
    if (isFavorite) dispatch(dispatch(unfavor(manga)));
    else dispatch(dispatch(favor(manga)));
  }, [isFavorite, manga, dispatch]);

  const currentList = useMemo(() => inWhichList(manga, saveLists) || '', [saveLists, manga]);
  const setCurrentList = useCallback(
    (e: ChangeEvent<any>) => {
      if (currentList) {
        dispatch(removeFromList(manga, currentList));
      }
      if (e.target.value) {
        dispatch(addToList(manga, e.target.value as ListType));
      }
    },
    [currentList, manga, dispatch]
  );

  return (
    <div className={classes.root}>
      <IconButton onClick={setFavorite}>
        {isFavorite ? <FavoriteIcon className={classes.heart} /> : <FavoriteBorderIcon className={classes.heart} />}
      </IconButton>
      <FormControl variant="outlined" size="small">
        <Select value={currentList} onChange={setCurrentList}>
          <MenuItem value="">
            <em>Список не выбран</em>
          </MenuItem>
          <MenuItem value={'readLater'}>Буду читать</MenuItem>
        </Select>
        <FormHelperText className={classes.helperText}>Сохранить в список</FormHelperText>
      </FormControl>
    </div>
  );
};
