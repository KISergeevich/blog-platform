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
        <label htmlFor="email">
          Email address
          <input
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            placeholder="Email address"
            id="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
            placeholder="Email address"
            id="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
        </label>
        <button type="submit" className={classes.signIn__button}>
          Login
        </button>
      </form>
      <span className={classes.signIn__moveToSignUp}>
        Do not have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </div>
  )
}
