import '../styles/globals.css';
import React, { Dispatch, useEffect } from 'react';
import { AppProps } from 'next/app';
import { Box, Container, createStyles, makeStyles, ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Header } from '../components/Header';
import { State, wrapper } from '../redux/store';
import { setPalette } from '../redux/theme/actions';
import '../utils/axiosConfig';
import { initInterceptors } from '../utils/axiosConfig';
import { MangaType } from '../catalogs/baseCatalog';
import { loadLastVisitedManga } from '../redux/manga/actions';
import _ from 'lodash';

const loadCachedPalettes = (dispatch: Dispatch<any>, clientDark: any, clientLight: any) => {
  // Load palettes from localStorage if needed
  // Client changes are synced TO localStorage in a different function
  return () => {
    const data = window.localStorage.getItem('sora-theme') || '{}';
    const cachedState = JSON.parse(String(data));

    if (!_.isEmpty(cachedState)) {
      const cachedDark = cachedState.darkPalette;
      const cachedLight = cachedState.lightPalette;

      const darkDiff = JSON.stringify(cachedDark) !== JSON.stringify(clientDark);
      const lightDiff = JSON.stringify(cachedLight) !== JSON.stringify(clientLight);

      if (darkDiff) {
        console.log('Dark palettes differ, dispatching');
        dispatch(setPalette(cachedDark, 'dark'));
      }

      if (lightDiff) {
        console.log('Light palettes differ, dispatching');
        dispatch(setPalette(cachedLight, 'light'));
      }
    }
  };
};

const syncLastVisited = (dispatch: Dispatch<any>, clientState: Array<MangaType>) => {
  // Sync lastVisited both from and to localStorage
  return () => {
    const data = window.localStorage.getItem('sora-last-visited') || '[]';
    const cachedState = JSON.parse(String(data));

    const jsonClientState = JSON.stringify(clientState);
    const needsUpdate = jsonClientState !== JSON.stringify(cachedState);

    // If they're not equal
    if (needsUpdate) {
      // And client's state is empty (first render)
      if (_.isEmpty(clientState)) {
        // Then load cached state
        const cachedLastVisited: Array<MangaType> = cachedState;
        dispatch(loadLastVisitedManga(cachedLastVisited));
      }
      // But if client state has something different, than cache
      else {
        // Then it means we need to sync localStorage
        window.localStorage.setItem('sora-last-visited', jsonClientState);
      }
    }
  };
};

function WrappedApp(props: AppProps) {
  const { Component, pageProps } = props;
  const { theme, darkPalette, lightPalette } = useSelector((state: State) => state.theme);
  const { lastVisited } = useSelector((state: State) => state.manga);
  const dispatch = useDispatch();
  const store = useStore();

  const useStyles = makeStyles(() =>
    createStyles({
      box: {
        minHeight: '100vh',
        padding: theme.spacing(0),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      main: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: '100vh',
      },
    })
  );

  const classes = useStyles();

  useEffect(() => {
    // Initialize axios interceptors once for client and give it access to your wrapper store
    initInterceptors(store);
  }, []);

  // Load last visited from localstorage if needed
  useEffect(syncLastVisited(dispatch, lastVisited), [lastVisited]);
  // Sync theme between localstorage and client state
  useEffect(loadCachedPalettes(dispatch, darkPalette, lightPalette), [theme]);

  const roboto = 'https://fonts.googleapis.com/css?' + 'family=Roboto:300,400,500,700&display=swap';
  const montserrat =
    'https://fonts.googleapis.com/css2?' +
    'family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600' +
    ';0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,' +
    '800;1,900&display=swap';

  return (
    <>
      <GoogleFonts href={roboto} />
      <GoogleFonts href={montserrat} />
      <Head>
        <title>
          Sora
          {process.env.NODE_ENV === 'development' ? ' DEV' : ''}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>

      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <Header />
          <Container maxWidth="md" component="main" className={classes.main}>
            <Component {...pageProps} />
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
