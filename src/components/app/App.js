import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderLine from '../header-line/header-line'

import classes from './app.module.scss'

export default function App() {
  return (
    <>
      <HeaderLine />
      <div className={classes.App}>
        <Outlet />
      </div>
    </>

    //   <BlockRegistration/>
    //   <BlockSignIn/>
    //   <blockEditProfile/>
    //   <Article />
    //   <NewArticle />
  )
}
