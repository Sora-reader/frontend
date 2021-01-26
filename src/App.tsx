import React from 'react';
import {
  Box,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {Header} from './components/Header';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {SearchView} from './components/views/search/SearchView';
import {DetailView} from './components/views/detail/DetailView';
import {IndexView} from './components/views/index/IndexView';
import {MangaType} from './catalogs/baseCatalog';
import {useCustomTheme, useStickyState} from './utils/hooks';

function App() {
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
        },
      }),
  );

  const classes = useStyles(theme);

  // Dev until the API is unavailable
  const [manga, setManga] = useStickyState({
    title: '',
    link: '',
    imageUrl: '',
  } as MangaType, 'data');
  // const [manga, setManga] = useState({
  //   title: '',
  //   link: '',
  //   imageUrl: '',
  // } as MangaType);

  return (
      <Router>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
          <Box className={classes.box}>
            <header>
              <Header/>
            </header>
            <Container maxWidth={'md'}
                       component={'main'}
                       className={classes.main}
            >
              <Switch>
                <Route exact path={'/'} component={IndexView}/>
                <Route exact path={'/search'} render={
                  props => <SearchView {...props}
                                       setManga={setManga}/>
                }/>
                <Route exact path={'/manga'} render={
                  props => <DetailView {...props}
                                       manga={manga} setManga={setManga}/>
                }/>

              </Switch>
            </Container>
          </Box>
        </ThemeProvider>
      </Router>
  );
}

export default App;
