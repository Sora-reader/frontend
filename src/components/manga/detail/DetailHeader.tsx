import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { MangaImage } from '../MangaImage';
import { Skeleton } from '@material-ui/lab';
import { useImageLoaded } from '../../../utils/hooks';
import { memo } from 'react';

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        height: '200px',
      },
      [theme.breakpoints.up('sm')]: {
        height: '250px',
      },
      [theme.breakpoints.up('md')]: {
        height: '300px',
        marginBottom: theme.spacing(4),
      },
    },
    titleContainer: {
      padding: theme.spacing(2),
    },
    title: {},
    altTitle: {
      margin: 0,
      marginBottom: '0.5rem',
      opacity: 0.5,
    },
    skeleton: {
      position: 'absolute',
      top: '10%',
      left: '2.5%',
      borderRadius: '1rem',
    },
    avatar: {
      position: 'absolute',
      top: '10%',
      left: '2.5%',

      height: '100%',
      width: 'auto',

      [theme.breakpoints.down('sm')]: {
        maxWidth: '40%',
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: '30%',
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '20%',
      },
    },
    avatarImg: { width: 'auto' },
    avatarBg: {
      borderRadius: 0,
      height: '100%',

      filter: 'blur(6px)',
      '-webkit-filter': 'blur(6px)',

      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: ({ image }) => `url("${image}")`,
      backgroundOrigin: 'content-box',
    },
  })
);

type Props = {
  title: string;
  image?: string;
  altTitle?: string;
};

export const DetailHeader = memo((props: Props) => {
  const classes = useStyles(props);
  const avatarLoaded = useImageLoaded(props?.image);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.avatarBg}></div>
        {avatarLoaded ? (
          <MangaImage
            src={props.image}
            variant="rounded"
            className={classes.avatar}
            classes={{ img: classes.avatarImg }}
          />
        ) : (
          <Skeleton
            height="250px"
            width="175px"
            variant="rect"
            className={classes.avatar}
            style={{ borderRadius: '0.5rem' }}
          />
        )}
      </div>
      <div className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          {props.title ? props.title : <Skeleton animation="wave" />}
        </Typography>
        {props.altTitle ? <h3 className={classes.altTitle}>{props.altTitle}</h3> : ''}
      </div>
    </>
  );
});
