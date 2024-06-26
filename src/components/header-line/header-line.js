import React from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'

import icon from '../../assets/img/icon.png'
import { changeLogInStatus, deleteToken, selectIsSignedIn, selectUser } from '../../redux/sign/sign-slice'

import classes from './header-line.module.scss'

export default function HeaderLine() {
  const dispatch = useDispatch()
  const history = useHistory()
  const isSignedIn = useSelector(selectIsSignedIn)

  const logOut = () => {
    dispatch(deleteToken())
    dispatch(changeLogInStatus())
    history.push('/articles')
  }

  const user = useSelector(selectUser)
  return (
    <div className={classes.headerLine}>
      <Link to="/articles" className={classes.headerLine__buttonMenu}>
        Realworld Blog
      </Link>
      {isSignedIn ? (
        <div className={classes.headerLine__signed}>
          <Link to="/new-article" className={classes.headerLine__createArticle} type="button">
            Create article
          </Link>
          <Link to="/profile" className={classes.headerLine__user}>
            <div className={classes.headerLine__username}>{user.username}</div>
            <img
              className={classes.headerLine__logo}
              src={user.image}
              alt="userLogo"
              onError={(e) => {
                e.target.src = icon
              }}
            />
          </Link>
          <button onClick={logOut} className={classes.headerLine__logOut} type="button">
            Log Out
          </button>
        </div>
      ) : (
        <>
          <div className={classes.headerLine__signIn}>
            <Link to="/sign-in" className={classes.headerLine__buttonSignIn}>
              Sign In
            </Link>
          </div>
          <div className={classes.headerLine__signUp}>
            <Link to="/sign-up" className={classes.headerLine__buttonsignUp}>
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
