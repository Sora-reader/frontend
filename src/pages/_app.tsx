import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core';
import Head from 'next/head';
import { useSelector, useStore } from 'react-redux';
import { RootState, StoreType, wrapper } from '../redux/store';
import { initInterceptors } from '../utils/axios';
import { syncLastVisited } from '../redux/manga/utils';
import { useThemeHooks } from '../redux/theme/utils';
import { Box, Container, LinearProgress, ThemeProvider } from '@material-ui/core';
import { Header } from '../components/Header';
import { useRouter } from 'next/router';
import { useCustomEventListeners } from '../utils/eventListeners';
import { useNeedSpinner } from '../redux/progressBar/utils';

type StyleProps = { minHeight: string };

// We can't access local theme as it's passed only to children of ThemeProvider
const useStyles = (theme: Theme) =>
  makeStyles<Theme, StyleProps>(() =>
    createStyles({
      '@global': {
        html: {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          'min-height': '100% !important',
        },
        body: {
          // TODO: stop using minHeight 100%/100vh everywhere
          'min-height': '100% !important',
          'font-family': '-apple-system, BlinkMacSystemFont, \'Roboto\', \'Helvetica Neue\', sans-serif',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          margin: 0,
        },

        // TODO: override Typograhpy
        'h1, h2, h3, h4, h5, h6': {
          'font-family':
            '-apple-system, BlinkMacSystemFont, \'Montserrat\', \'Roboto\', \'Helvetica Neue\', sans-serif !important',
        },
      },
      box: {
        minHeight: ({ minHeight }) => minHeight,
        padding: theme.spacing(0),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      main: {
        position: 'relative',
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      readerMain: {
        position: 'relative',
        padding: 0,
        // backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      progress: {
        position: 'absolute',
        width: '100%',
      },
    })
  );

function WrappedApp({ Component, pageProps }: AppProps) {
  const store = useStore() as StoreType;
  const themeState = useSelector((state: RootState) => state.theme);
  const router = useRouter();

  const generateTheme = () => createMuiTheme({ palette: themeState.palettes[themeState.mode] });
  const [theme, setTheme] = useState(generateTheme());

  useCustomEventListeners();
  useThemeHooks({ store, themeState, setTheme, generateTheme });
  const needSpinner = useNeedSpinner();

  const { lastVisited } = useSelector((state: RootState) => state.manga);
  const classes = useStyles(theme)({
    minHeight: '100vh',
  });

  // Initialize axios interceptors once for client and give it access to your wrapper store
  useEffect(() => initInterceptors(store), []);
  // Load last visited from localstorage if needed
  useEffect(syncLastVisited(store.dispatch, lastVisited), [lastVisited]);

  return (
    <>
      <Head>
        <title>
          Sora
          {process.env.NODE_ENV === 'development' ? ' DEV' : ''}
        </title>
        <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta name="theme-color" content={theme.palette.primary.main} />

        <meta property="og:title" content="Sora reader" />
        <meta property="og:image" content="/icon-512x512.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <Header />
          {!/^\/read/.test(router.asPath) ? (
            <>
              <Container maxWidth="md" component="main" className={classes.main}>
                {needSpinner && <LinearProgress className={classes.progress} />}
                <br style={{ paddingBottom: '1rem' }} />
                <Component {...pageProps} />
              </Container>
            </>
          ) : (
            <Container maxWidth="md" component="main" className={classes.readerMain}>
              <Component {...pageProps} />
            </Container>
          )}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
