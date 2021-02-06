import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './auth-reducer';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import s from './Login.module.css'


type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}


export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less';
      }
      return errors;
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: (values) => {
      dispatch(login(values))
      formik.resetForm()
    },
  });

  if (isLoggedIn) {
    return <Redirect to={'/'}/>
  }

  return (
  <Grid container justify="center">
    <Grid item xs={6}>
      <form onSubmit={formik.handleSubmit} className={s.form}>
      <FormControl>
        <FormLabel>
          <p>To log in get registered
            <a href={'https://social-network.samuraijs.com/'}
               target={'_blank'}>here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email
            ? (
            <div className={s.fieldError}>{formik.errors.email}</div>)
            : null}
          <TextField
            type="password"
            label="Password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password
            ? (
            <div className={s.fieldError}>{formik.errors.password}</div>)
            : null}
          <FormControlLabel
            label={'Remember me'}
            control={<Checkbox
              {...formik.getFieldProps('rememberMe')}
              checked={formik.values.rememberMe}/>}
          />
          <Button type={'submit'}
                  variant={'contained'}
                  color={'secondary'}>Login</Button>
        </FormGroup>
      </FormControl>
      </form>
    </Grid>
  </Grid>
  )
}
