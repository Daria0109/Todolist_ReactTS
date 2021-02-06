import React from 'react';
import s from './Error404.module.css'
import errorImage from './../../assets/404-error.jpg'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {Login} from '../../features/Login/Login';

export const Error404 = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  return <div className={s.error_block}>
    <img className={s.error_img} src={errorImage} alt="404"/>
    <div className={s.error_text}>
      <div className={s.error_header}>OOOPS! PAGE NOT FOUND...</div>
      <p className={s.error_paragraph}>You must have picked the wrong door because I haven't been able to
        lay my eye on the page you've been searching for.</p>
    </div>
  </div>
}