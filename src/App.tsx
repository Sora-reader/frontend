import React, {useState} from 'react';
import {
  Box,
  Container,
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {grey, teal} from '@material-ui/core/colors';
import {Header} from './components/Header';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {SearchView} from './components/views/search/SearchView';
import {DetailView} from './components/views/detail/DetailView';
import {IndexView} from './components/views/index/IndexView';
import {MangaType} from './catalogs/baseCatalog';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      ...teal,
    },
    secondary: {
      ...grey,
      main: grey['900'],
      light: '#313131',
    },
    background: {
      paper: '#313131',
    },
  },
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  box: {
    minHeight: '100vh',
    backgroundColor: defaultTheme.palette.secondary.main,
    color: 'white',
    padding: theme.spacing(0),
  },
  main: {
    padding: 0,
    backgroundColor: defaultTheme.palette.background.paper,
    color: 'white',
  },
}));

function App() {
  const [manga, setManga] = useState({
    title: '',
    link: '',
    imageUrl: '',
  } as MangaType);

  const classes = useStyles();

  return (
      <Router>
        <ThemeProvider theme={defaultTheme}>
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
                <Route exact path={'/search'} component={SearchView}
                       setManga={setManga}/>
                <Route exact path={'/search/manga'} component={DetailView}
                       manga={manga} setManga={setManga}/>

              </Switch>
            </Container>
          </Box>
        </ThemeProvider>
      </Router>
  );
}

export default App;
