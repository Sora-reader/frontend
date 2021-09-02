import '../style/global.css';
import { useMemo } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import Head from 'next/head';
import { useSelector, useStore } from 'react-redux';
import { RootState, StoreType, wrapper } from '../redux/store';
import { useCustomInterceptors } from '../utils/axios';
import { Box, Container, LinearProgress, ThemeProvider } from '@material-ui/core';
import { NavigationHeader } from '../components/header/NavigationHeader';
import { useRouter } from 'next/router';
import { useCustomEventListeners } from '../utils/customListeners';
import { useNeedSpinner } from '../redux/progressBar/utils';
import CssBaseline from '@material-ui/core/CssBaseline';
import { defaultDark } from '../redux/theme/defaults';

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
        width: '100%',
      },
    })
  );

function WrappedApp({ Component, pageProps }: AppProps) {
  const store = useStore() as StoreType;
  const themeState = useSelector((state: RootState) => state.theme);
  const router = useRouter();

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
  const needSpinner = useNeedSpinner();

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

        {/* OG */}
        {/* <meta name="description" content="Читайте мангу на Sora" /> */}
        {/* Facebook */}
        {/* <meta property="og:type" content="website" key="facebook_type" />

        <meta property="og:site_name" content="Sora reader" key="facebook_site_name" />

        <meta property="og:title" content="Sora reader" key="facebook_title" />
        <meta property="og:description" content="Читайте мангу на Sora" key="facebook_description" />
        <meta property="og:image" content="/icon-512x512.png" key="facebook_image" /> */}

        {/* Twitter */}
        {/* <meta property="twitter:card" content="summary_large_image" key="twitter_card" />

        <meta property="twitter:url" content={router.route} key="twitter_url" />
        <meta property="twitter:site" content="@sora-reader" key="twitter_site" />
        <meta property="twitter:domain" content="sora-reader.app" key="twitter_domain" />

        <meta property="twitter:title" content="Sora reader" key="twitter_title" />
        <meta property="twitter:description" content="Читайте мангу на Sora" key="twitter_description" />
        <meta property="twitter:image" content="/icon-512x512.png" key="twitter_image" /> */}
      </Head>

      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          {!/^\/read/.test(router.asPath) ? (
            <>
              <NavigationHeader />
              <Container maxWidth="md" component="main" className={classes.main}>
                {needSpinner && <LinearProgress className={classes.progress} />}
                <Component {...pageProps} />
              </Container>
            </>
          ) : (
            // We don't want to render progress bar when in reader mode
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
