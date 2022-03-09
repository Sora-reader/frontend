import { ListType } from '../redux/saveLists/types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';

export type SaveListMap = { icon: JSX.Element; alt: string };

export const saveList: Record<ListType, SaveListMap> = {
  favorite: { icon: <FavoriteIcon />, alt: 'Избранное' },
  readLater: { icon: <ListIcon />, alt: 'Буду читать' },
};

export const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const domain = process.env.NODE_ENV === 'production' ? 'sora-reader.app' : 'localhost:3000';
export const baseUrl = `${protocol}://${domain}`;
export const resizeUrl = process.env.NEXT_PUBLIC_RESIZE_URL;

export const mangaListImageSize = { width: 130, height: 180 };

export const detailUpdateDeadline = 1;
export const chapterUpdateDeadline = 1;
