import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import classes from './header-line.module.scss'

export default function HeaderLine() {
  return (
    <div className={classes.headerLine}>
      <Link to="/articles" className={classes.headerLine__buttonMenu}>
        Realworld Blog
      </Link>

      <form className={classes.headerLine__signIn}>
        <button className={classes.headerLine__buttonSignIn} type="button">
          Sign In
        </button>
      </form>
      <form className={classes.headerLine__signUp}>
        <button className={classes.headerLine__buttonsignUp} type="button">
          Sign Up
        </button>
      </form>
    </div>
  )
}
