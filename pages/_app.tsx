import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';
import {Box, Container, createStyles, makeStyles} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {useCustomTheme, useStickyState} from '../utils/hooks';
import {MangaType} from '../catalogs/baseCatalog';
import {AppProps} from 'next/app';
import {Header} from '../components/Header';

function MyApp({Component, pageProps}: AppProps) {
  const [theme, setThemeType] = useCustomTheme('dark');

  const useStyles = makeStyles(() => createStyles({
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
      }),
  );

  const classes = useStyles(theme);

  const [manga, setManga] = useStickyState({
    title: '',
    link: '',
    imageUrl: '',
  } as MangaType, 'data');

  return <React.Fragment>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>

      <title>Manga Reader</title>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?
      family=Roboto:300,400,500,700&display=swap"/>
      <link href="https://fonts.googleapis.com/css2?
      family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0
      ,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&
      display=swap" rel="stylesheet"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?
      family=Material+Icons"/>
    </Head>

    <noscript>You need to enable JavaScript to run this app.</noscript>

    <ThemeProvider theme={theme}>
      <Box className={classes.box}>
        <header>
          <Header/>
        </header>
        <Container maxWidth={'md'}
                   component={'main'}
                   className={classes.main}
        >
          <Component {...pageProps} />
        </Container>
      </Box>
    </ThemeProvider>
  </React.Fragment>;
}

export default MyApp;