import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderLine from '../header-line/header-line'

// import classes from './app.modile.scss'

export default function App() {
  return (
    <>
      <HeaderLine />
      <Outlet />
    </>

    //   <BlockRegistration/>
    //   <BlockSignIn/>
    //   <blockEditProfile/>
    //   <Article />
    //   <NewArticle />
  )
}
