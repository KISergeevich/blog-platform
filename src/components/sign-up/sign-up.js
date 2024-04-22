/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useForm, Controller } from 'react-hook-form'

import classes from './sign-up.module.scss'

export default function SignUp() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div className={classes.signUp}>
      <h4 className={classes.signUp__title}>Create new account</h4>

      <form className={classes.signUp__buttonForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.signUp__registrationBlock}>
          <label className={classes.signUp__label} htmlFor="username">
            Username
            <input
              className={classes.signUp__input}
              {...register('username', { required: true, minLength: 3, maxLength: 20 })}
              placeholder="Username"
              id="username"
              aria-invalid={errors.username ? 'true' : 'false'}
            />
            <span className={classes.signUp__error}>
              {errors.username?.type === 'required' ? 'Username is required' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.username?.type === 'minLength' ? 'Username should be at least 3 characters' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.username?.type === 'maxLength' ? 'Username should be less 20 characters' : null}
            </span>
          </label>
          <label className={classes.signUp__label} htmlFor="Email address">
            Email address
            <input
              className={classes.signUp__input}
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              placeholder="Email address"
              id="Email address"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <span className={classes.signUp__error}>
              {errors.email?.type === 'required' ? 'Email address is required' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.email?.type === 'pattern' ? 'Email address must be valid' : null}
            </span>
          </label>
          <label className={classes.signUp__label} htmlFor="password">
            Password
            <input
              className={classes.signUp__input}
              {...register('password', { required: true, minLength: 6, maxLength: 40 })}
              type="password"
              placeholder="Password"
              id="password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <span className={classes.signUp__error}>
              {errors.password?.type === 'required' ? 'Password is required' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.password?.type === 'minLength' ? 'Your password needs to be at least 6 characters' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.password?.type === 'maxLength' ? 'Your password needs to be less 40 characters' : null}
            </span>
          </label>
          <label className={classes.signUp__label} htmlFor="RepeatPassword">
            Repeat Password
            <input
              className={classes.signUp__input}
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
                maxLength: 40,
                validate: (value, form) => value === form.password,
              })}
              type="password"
              placeholder="Password"
              id="RepeatPassword"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <span className={classes.signUp__error}>
              {errors.confirmPassword?.type === 'required' ? 'Password is required' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.confirmPassword?.type === 'minLength' ? 'Your password needs to be at least 6 characters' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.confirmPassword?.type === 'maxLength' ? 'Your password needs to be less 40 characters' : null}
            </span>
            <span className={classes.signUp__error}>
              {errors.confirmPassword?.type === 'validate' ? 'Passswords must match' : null}
            </span>
          </label>
        </div>
        <div className={classes.signUp__checkboxBlock}>
          <Controller
            rules={{ required: true }}
            name="agreement"
            control={control}
            render={({ field }) => (
              <input {...field} type="checkbox" aria-invalid={errors.agreement ? 'true' : 'false'} />
            )}
          />
          <span className={classes.signUp__checkboxText}>I agree to the processing of my personal information</span>
        </div>
        <div className={classes.signUp__error}>
          {errors.agreement?.type === 'required' ? 'Need to agree with processing' : null}
        </div>
        <button type="submit" className={classes.signUp__button}>
          Create
        </button>
      </form>

      <span className={classes.signUp__moveToSignIn}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </div>
  )
}
