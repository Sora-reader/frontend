import { detailUpdateDeadline } from '../../core/consts';
import { utcDate } from '../../common/utils';
import { Manga } from '../../api/types';

/**
 * Check if manga details need update
 */
export const detailsNeedUpdate = (manga: Manga) => {
  if (!manga) return true;
  if (!manga.updatedDetail) return false;
  const updateDeadline = utcDate();
  updateDeadline.setHours(updateDeadline.getHours() - detailUpdateDeadline);
  return new Date(manga.updatedDetail) < updateDeadline;
};
