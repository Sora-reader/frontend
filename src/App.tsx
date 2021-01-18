import React from 'react';
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
import {Search} from './components/Search/Search';

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
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

function App() {
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

                <Route path={'/search'}>
                  <Search/>
                </Route>

                <Route path={'/'}>
                  Index
                </Route>

              </Switch>
            </Container>
          </Box>
        </ThemeProvider>
      </Router>
  );
}

export default App;
