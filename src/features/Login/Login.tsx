import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './auth-reducer';
import {initializePuppeteerNode} from 'puppeteer/lib/cjs/puppeteer/initialize-node';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';


type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}


export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

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

  return <Grid container justify="center">
    <Grid item xs={4}>
      <form onSubmit={formik.handleSubmit}>
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
            <div style={{color: 'red'}}>{formik.errors.email}</div>)
            : null}
          <TextField
            type="password"
            label="Password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password
            ? (
            <div style={{color: 'red'}}>{formik.errors.password}</div>)
            : null}
          <FormControlLabel
            label={'Remember me'}
            control={<Checkbox
              {...formik.getFieldProps('rememberMe')}
              checked={formik.values.rememberMe}/>}
          />
          <Button type={'submit'}
                  variant={'contained'}
                  color={'primary'}>Login</Button>
        </FormGroup>
      </FormControl>
      </form>
    </Grid>
  </Grid>
}
