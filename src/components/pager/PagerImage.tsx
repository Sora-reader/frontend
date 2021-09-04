import { Dispatch, forwardRef, Ref, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { CenteredProgress } from '../CenteredProgress';
import { Dispatch as RDispatch } from '@reduxjs/toolkit';
import { CurrentChapter } from '../../redux/manga/reducer';
import { setRead } from '../../redux/manga/actions';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    chapterImage: {
      pointerEvents: 'none',
      height: 'auto',
      width: '100%',
    },
  })
);

export type ReaderImageProps = {
  image: string;
  current: boolean;
  position: number;
  setHeaderImageNumber: Dispatch<SetStateAction<number>>;
  onCurrent?: (position: number) => any;
  persist?: boolean;
  classes?: Partial<ReturnType<typeof useStyles>>;
};

export const PagerImage = forwardRef(
  (
    { image, current, position, onCurrent, persist, classes: propClasses, setHeaderImageNumber }: ReaderImageProps,
    ref: Ref<any>
  ) => {
    /**
     * Component for image rendering. Will show circular progress until the image is loaded. Loading starts lazily
     * @param image Image link
     * @param current Boolean to detect if the image is currently shown to client (used to start loading)
     * @param position Image number to show in Header
     * @param persist Whether to not hide the image if it's not current. Persist for webtoon and hide for default pager
     * to prevent spoilers if you scroll down and then swipe next chapter
     */
    const classes = { ...useStyles(), ...propClasses };
    const [visited, setVisited] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const shouldRender = useMemo(() => {
      if (persist !== undefined && !persist) return;
      return loaded;
    }, [persist, loaded]);

    useEffect(() => {
      if (current && loaded && setHeaderImageNumber) {
        if (onCurrent) onCurrent(position);
        setHeaderImageNumber(position + 1);
      }
    }, [current, position, loaded, onCurrent, setHeaderImageNumber]);

    useEffect(() => {
      if (current && !visited) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          setLoaded(true);
        };
        setVisited(true);
      }
    }, [image, visited, current]);

    return (
      <div className={classes.root} ref={ref}>
        {shouldRender ? <Avatar variant="square" className={classes.chapterImage} src={image} /> : <CenteredProgress />}
      </div>
    );
  }
);

/**
 * @returns Memoized callback which dispatched setRead if needed
 */
export const useSetReadOnCurrent = (dispatch: RDispatch, mangaId: number, chapter?: CurrentChapter) =>
  useCallback(
    (position: number) => {
      if (chapter && chapter.images && position >= chapter.images.length / 2) dispatch(setRead(mangaId, chapter.id));
    },
    [dispatch, mangaId, chapter]
  );
