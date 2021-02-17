import '../styles/globals.css';
import React from 'react';
import {AppProps} from 'next/app';
import {
  Box,
  Container,
  createStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import {useCustomTheme} from '../utils/hooks';
import {wrapper} from '../redux/store';
import Head from 'next/head';
import {Header} from '../components/Header';

function WrappedApp({Component, pageProps}: AppProps) {
  const [theme] = useCustomTheme('dark');

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

  const classes = useStyles();

  return <React.Fragment>
    <Head>
      <title>Manga Reader</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>

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

export default wrapper.withRedux(WrappedApp);