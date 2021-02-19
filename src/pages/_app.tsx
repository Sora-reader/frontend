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
import {State, wrapper} from '../redux/store';
import Head from 'next/head';
import {Header} from '../components/Header';
import GoogleFonts from 'next-google-fonts';
import {useSelector} from 'react-redux';

function WrappedApp({Component, pageProps}: AppProps) {
  const theme = useSelector((state: State) => state.theme.theme);

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

  const roboto = 'https://fonts.googleapis.com/css?' +
      'family=Roboto:300,400,500,700&display=swap';
  const montserrat = 'https://fonts.googleapis.com/css2?' +
      'family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600' +
      ';0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,' +
      '800;1,900&display=swap';

  return <React.Fragment>
    <GoogleFonts href={roboto}/>
    <GoogleFonts href={montserrat}/>
    <Head>
      <title>Sora</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content={theme.palette.primary.main}/>
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