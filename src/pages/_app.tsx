import '../styles/globals.css';
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Box, Container, createStyles, LinearProgress, makeStyles, Theme, ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';
import { useSelector, useStore } from 'react-redux';
import { Header } from '../components/Header';
import { RootState, StoreType, wrapper } from '../redux/store';
import { initInterceptors } from '../utils/axios';
import { syncLastVisited } from '../redux/manga/utils';
import { loadCachedPalettes } from '../redux/theme/utils';

// Just a test of style props for makeStyles
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
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
    })
  );

function WrappedApp(props: AppProps) {
  const { Component, pageProps } = props;
  const { theme, darkPalette, lightPalette } = useSelector((state: RootState) => state.theme);
  const { lastVisited } = useSelector((state: RootState) => state.manga);
  const classes = useStyles(theme)({
    minHeight: '100vh',
  });

  const store = useStore() as StoreType;
  const loaderTasks = useSelector((state: RootState) => state.loader);
  const needSpinner = Boolean(loaderTasks.length);

  // Initialize axios interceptors once for client and give it access to your wrapper store
  useEffect(() => initInterceptors(store), []);
  // Load last visited from localstorage if needed
  useEffect(syncLastVisited(store.dispatch, lastVisited), [lastVisited]);
  // Sync theme between localstorage and client state
  useEffect(loadCachedPalettes(store.dispatch, darkPalette, lightPalette), [theme]);

  return (
    <>
      <GoogleFonts href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'} />
      <GoogleFonts href={'https://fonts.googleapis.com/css2?family=Montserra&display=swap'} />
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
            {needSpinner && <LinearProgress />}
            <Component {...pageProps} />
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
