import '../style/global.css';
import { useMemo } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import Head from 'next/head';
import { useSelector, useStore } from 'react-redux';
import { RootState, StoreType, wrapper } from '../redux/store';
import { useCustomInterceptors } from '../common/axios';
import { Box, Container, LinearProgress, ThemeProvider } from '@material-ui/core';
import { NavigationHeader } from '../components/header/NavigationHeader';
import { useRouter } from 'next/router';
import { useCustomEventListeners } from '../common/customListeners';
import CssBaseline from '@material-ui/core/CssBaseline';
import { defaultDark } from '../redux/theme/defaults';
import { getBaseOpenGraph } from '../common/opengraph';
import { ErrorSnackbar } from '../components/error/ErrorSnackbar';
import { useRouteChanges as useRouteChanging } from '../common/hooks';

type StyleProps = { minHeight: string };

// We can't access local theme as it's passed only to children of ThemeProvider
const useStyles = (theme: Theme) =>
  makeStyles<Theme, StyleProps>(() =>
    createStyles({
      box: {
        minHeight: ({ minHeight }) => minHeight,
        padding: theme.spacing(0),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      main: {
        position: 'relative',
        padding: 0,
        paddingBottom: '1rem',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      readerMain: {
        position: 'relative',
        padding: 0,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      progress: {
        position: 'absolute',
        zIndex: 9999, // to render over header
        width: '100vw',
      },
    })
  );

function WrappedApp({ Component, pageProps }: AppProps) {
  const store = useStore() as StoreType;
  const themeState = useSelector((state: RootState) => state.theme);
  const errors = useSelector((state: RootState) => state.errors);
  const router = useRouter();
  const routeChaning = useRouteChanging();

  const theme = useMemo(() => {
    let options: ThemeOptions = { palette: defaultDark };
    if (themeState) options = { palette: themeState.palettes[themeState.mode] };
    return createMuiTheme(options);
  }, [themeState]);
  const classes = useStyles(theme)({
    minHeight: '100vh',
  });

  useCustomEventListeners();
  useCustomInterceptors(store);

  return (
    <>
      <CssBaseline />
      <Head>
        <title>
          Sora
          {process.env.NODE_ENV === 'development' ? ' DEV' : ''}
        </title>
        <meta
          name="viewport"
          id="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1, user-scalable=0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        <meta
          name="theme-color"
          content={theme.palette.type === 'dark' ? theme.palette.grey['800'] : theme.palette.primary.main}
        />

        {getBaseOpenGraph()}
      </Head>

      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          {routeChaning && <LinearProgress className={classes.progress} />}
          {!/^\/read/.test(router.asPath) ? (
            <>
              <NavigationHeader />
              <Container maxWidth="md" component="main" className={classes.main}>
                <Component {...pageProps} />
              </Container>
            </>
          ) : (
            // We don't want to render header when in reader mode
            <Container maxWidth="md" component="main" className={classes.readerMain}>
              <Component {...pageProps} />
            </Container>
          )}
        </Box>
        {errors.map((e, i) => (
          <ErrorSnackbar key={Number(e.id)} error={e} index={i} />
        ))}
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
