import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import ErrorSnackbar from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp, RequestStatusType} from './app-reducer';
import {AppRootStateType} from './store';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Error404} from '../components/Error404/Error404';
import {logout} from '../features/Login/login-reducer';


const AppWithRedux = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isAppInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isAppInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp())},
    [])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  if (!isAppInitialized) {
    return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
    <CircularProgress color="secondary" />
      </div>
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            {isLoggedIn
            ? <Button color="secondary" onClick={onLogout}>LOGOUT</Button>
            : <Button color="secondary" >LOGIN</Button>}
          </Toolbar>
          {status === 'loading' && <LinearProgress color="secondary"/>}
        </AppBar>
        <Container fixed>
          <Switch>
            <Route exact path={'/'} render={() => <TodolistsList/>}/>
            <Route path={'/login'} render={() => <Login/>}/>
            <Route path={'/404'} render={() => <Error404/>}/>
            <Redirect from={'*'} to={'/404'}/>
          </Switch>
          <ErrorSnackbar/>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default AppWithRedux;

