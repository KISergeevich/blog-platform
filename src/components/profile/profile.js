/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import { selectStatus, selectUser, updateProfile } from '../../redux/sign/sign-slice'

import classes from './profile.module.scss'

export default function Profile() {
  const user = useSelector(selectUser)
  const status = useSelector(selectStatus)

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (formValue) => {
    const userSubmit = {
      email: formValue.email,
      username: formValue.username,
      password: formValue.password,
      image: formValue.avatarUrl === '' ? undefined : formValue.avatarUrl,
    }
    dispatch(updateProfile({ user: userSubmit, token: user.token }))
  }

  if (user !== undefined) {
    return (
      <div className={classes.profile}>
        <h4 className={classes.profile__title}>Edit Profile</h4>
        <form className={classes.profile__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.profile__label} htmlFor="username">
            Username
            <input
              className={classes.profile__input}
              {...register('username', { required: true, minLength: 3, maxLength: 20, value: user.username })}
              placeholder="Username"
              id="username"
              aria-invalid={errors.username ? 'true' : 'false'}
            />
            <span className={classes.profile__error}>
              {errors.username?.type === 'required' ? 'Username is required' : null}
            </span>
            <span className={classes.profile__error}>
              {errors.username?.type === 'minLength' ? 'Username should be at least 3 characters' : null}
            </span>
            <span className={classes.profile__error}>
              {errors.username?.type === 'maxLength' ? 'Username should be less 20 characters' : null}
            </span>
          </label>
          <label className={classes.profile__label} htmlFor="Email address">
            Email address
            <input
              className={classes.profile__input}
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                value: user.email,
              })}
              placeholder="Email address"
              id="Email address"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <span className={classes.profile__error}>
              {errors.email?.type === 'required' ? 'Email address is required' : null}
            </span>
            <span className={classes.profile__error}>
              {errors.email?.type === 'pattern' ? 'Email address must be valid' : null}
            </span>
          </label>
          <label className={classes.profile__label} htmlFor="password">
            New password
            <input
              className={classes.profile__input}
              {...register('password', { required: true, minLength: 6, maxLength: 40 })}
              type="password"
              placeholder="Password"
              id="password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <span className={classes.profile__error}>
              {errors.password?.type === 'required' ? 'Password is required' : null}
            </span>
            <span className={classes.profile__error}>
              {errors.password?.type === 'minLength' ? 'Your password needs to be at least 6 characters' : null}
            </span>
            <span className={classes.profile__error}>
              {errors.password?.type === 'maxLength' ? 'Your password needs to be less 40 characters' : null}
            </span>
          </label>
          <label className={classes.profile__label} htmlFor="avatar">
            Avatar image (url)
            <input
              className={classes.profile__input}
              {...register('avatarUrl', {
                pattern: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
              })}
              placeholder="Avatar image"
              id="avatar"
              type="url"
              aria-invalid={errors.avatarUrl ? 'true' : 'false'}
            />
            <span className={classes.profile__error}>
              {errors.avatarUrl?.type === 'pattern' ? 'Url-адрес должен быть корректным' : null}
            </span>
          </label>
          <div className={classes.profile__spinBlock}>
            {status === 'loading' ? (
              <Spin size="large" className={classes.spin} />
            ) : (
              <button type="submit" className={classes.profile__button}>
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }
  return <Spin size="large" className={classes.spin} />
}
