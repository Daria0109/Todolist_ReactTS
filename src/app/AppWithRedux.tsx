import React, {useEffect} from 'react';
import './App.css';
import {
  CircularProgress,
  createMuiTheme,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
  ThemeProvider
} from '@material-ui/core';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import ErrorSnackbar from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp, RequestStatusType} from './app-reducer';
import {AppRootStateType} from './store';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Error404} from '../components/Error404/Error404';
import {Header} from '../components/Header/Header';
import {Preloader} from '../components/Preloader/Preloader';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#335c67',
    },
    secondary: {
      main: '#9e2a2b',
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100vw',
      backgroundColor: '#fff3b0',
      minHeight: '100vh',
      paddingBottom: '20px'
    },
    headerGrid: {
      width: '100%',
    }
  })
);

const AppWithRedux = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isAppInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isAppInitialized)
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
      dispatch(initializeApp())
    },
    [])

  if (!isAppInitialized) {
    return <Preloader/>
  }

  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Grid container direction='column' className={classes.root}>

        <Grid item className={classes.headerGrid}>
          <Header/>
          {status === 'loading' && <LinearProgress color="secondary"/>}
        </Grid>

        <Grid item container>
          <Grid item xs={1} sm={1}/>
          <Grid item xs={10} sm={10}>
          <Switch>
            <Route exact path={'/'} render={() => <TodolistsList/>}/>
            <Route path={'/login'} render={() => <Login/>}/>
            <Route path={'/404'} render={() => <Error404/>}/>
            <Redirect from={'*'} to={'/404'}/>
          </Switch>
          <ErrorSnackbar/>
          </Grid>
          <Grid item xs={1} sm={1}/>
        </Grid>
      </Grid>
    </BrowserRouter>
  </ThemeProvider>
}

export default AppWithRedux;

