import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import classes from './header-line.module.scss'

export default function HeaderLine() {
  return (
    <div className={classes.headerLine}>
      <Link to="/articles" className={classes.headerLine__buttonMenu}>
        Realworld Blog
      </Link>

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
    </div>
  )
}
