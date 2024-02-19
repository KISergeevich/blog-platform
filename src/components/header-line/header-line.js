import React from 'react'

import classes from './header-line.module.scss'

export default function HeaderLine() {
  return (
    <div className={classes.headerLine}>
      <form className={classes.headerLine__startMenu}>
        <button className={classes.headerLine__buttonMenu} type="button">
          Realworld Blog
        </button>
      </form>
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
