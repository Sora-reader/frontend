import { useEffect, useMemo, useState } from 'react';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      minHeight: '100vh',
    },
    progress: {
      position: 'absolute',
      margin: '0',
      top: '40%',
      left: 'calc(50% - 2.5rem)',
      width: '5rem !important',
      height: '5rem !important',
    },
    chapterImage: {
      pointerEvents: 'none',
      height: '100%',
      width: '100%',
    },
  })
);

type Props = {
  image: string;
  current: boolean;
};

export const ReaderImage = ({ image, current }: Props) => {
  const classes = useStyles();
  const [visited, setVisited] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const shouldRender = useMemo(() => {
    return current && visited && loaded;
  }, [visited, loaded, current]);

  useEffect(() => {
    if (current && !visited) {
      console.log('Start loading');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setLoaded(true);
      };
      setVisited(true);
    }
  }, [current]);

  return shouldRender ? (
    <Avatar variant="square" className={classes.chapterImage} src={image} />
  ) : (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
