import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import { MangaImage } from '../MangaImage';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../utils/apiTypes';
import { MangaRating } from '../MangaRating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    avatar: {
      [theme.breakpoints.down('sm')]: {
        width: '50%',
        height: '100%',
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.up('sm')]: {
        height: '100%',
        width: '20%',
        marginRight: theme.spacing(2),
      },
    },
    details: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '75%',
      },
    },
    title: {
      marginTop: 0,
      marginBottom: 0,
      '& span': {
        fontSize: 'xx-large',
        lineHeight: '2rem',
      },
    },
    altTitle: {
      margin: 0,
      marginBottom: '0.5rem',
      opacity: 0.5,
    },
    authors: {
      margin: 0,
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    genres: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    ratingContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: theme.spacing(1),
      '& > span': {
        alignItems: 'center',
        marginRight: theme.spacing(1),
      },
      '& p': {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.text.secondary,
      },
    },
    source: {},
  })
);

type Props = Manga;

export function MangaDetailHeader(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MangaImage src={props.image} variant="rounded" className={classes.avatar} />
      <div className={classes.details}>
        <h1 className={classes.title}>{props.title}</h1>
        {props.altTitle ? <h3 className={classes.altTitle}>{props.altTitle}</h3> : ''}
        {props.authors ? <h3 className={classes.authors}>{props.authors?.join(', ')}</h3> : ''}

        <ul className={classes.genres}>
          {props.genres?.map((genre) => (
            <SoraChip key={genre} component="li" label={genre} />
          ))}
        </ul>

        {props.rating ? (
          <div className={classes.ratingContainer}>
            <MangaRating value={props.rating} />
            <p>
              {props.rating}
              /5
            </p>
          </div>
        ) : (
          ''
        )}

        <div>
          <Link className={classes.source} target="_blank" href={props.sourceUrl}>
            <h4>Читать на {props.source}</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
