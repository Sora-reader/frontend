import { ListType } from '../redux/saveLists/types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';

export type SaveListMap = { icon: JSX.Element; alt: string };

export const saveList: Record<ListType, SaveListMap> = {
  favorite: { icon: <FavoriteIcon />, alt: 'Избранное' },
  readLater: { icon: <ListIcon />, alt: 'Буду читать' },
};
