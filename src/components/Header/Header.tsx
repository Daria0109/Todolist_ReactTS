import {AppBar, Box, Button, createStyles, IconButton, makeStyles, Theme, Toolbar} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {logout} from '../../features/Login/auth-reducer';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(0),
    },
    loginItems: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    logoutBtn: {
      marginLeft: '20px',
    }
  })
);

export const Header = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const login = useSelector<AppRootStateType, string | null>(state => state.auth.login)
  const dispatch = useDispatch();

  const classes = useStyles();

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return <AppBar position="static">

    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
        <Menu/>
      </IconButton>
      {isLoggedIn &&
      <Box className={classes.loginItems}>
        <AccountCircleSharpIcon/> {login}
        <Button color="secondary"
                onClick={onLogout}
                variant={'contained'}
                className={classes.logoutBtn}>LOGOUT</Button>
      </Box>}
    </Toolbar>

  </AppBar>
}