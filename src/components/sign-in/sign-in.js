/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import classes from './sign-in.module.scss'

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div className={classes.signIn}>
      <h4 className={classes.signIn__title}>Sign In</h4>
      <form className={classes.signIn__buttonForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.signIn__label} htmlFor="email">
          Email address
          <input
            className={classes.signIn__input}
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email address"
            id="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <span className={classes.signIn__error}>
            {errors.email?.type === 'required' ? 'Email address is required' : null}
          </span>
          <span className={classes.signIn__error}>
            {errors.email?.type === 'pattern' ? 'Email address must be valid' : null}
          </span>
        </label>
        <label className={classes.signIn__label} htmlFor="password">
          Password
          <input
            className={classes.signIn__input}
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
            placeholder="Password"
            id="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <span className={classes.signIn__error}>
            {errors.password?.type === 'required' ? 'Password is required' : null}
          </span>
          <span className={classes.signIn__error}>
            {errors.password?.type === 'minLength' ? 'Your password needs to be at least 6 characters' : null}
          </span>
          <span className={classes.signIn__error}>
            {errors.password?.type === 'maxLength' ? 'Your password needs to be less 40 characters' : null}
          </span>
        </label>
        <button type="submit" className={classes.signIn__button}>
          Login
        </button>
      </form>
      <span className={classes.signIn__moveToSignUp}>
        Do not have an account?{' '}
        <Link className={classes.signIn__link} to="/sign-up">
          Sign Up.
        </Link>
      </span>
    </div>
  )
}
