import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderLine from '../header-line/header-line'
import ArticleList from '../article-list/article-list'
import Article from '../acrticle/acrticle'
import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'

import classes from './app.module.scss'

export default function App() {
  return (
    <Router>
      <div className={classes.app__header}>
        <HeaderLine />
      </div>

      <div className={classes.app__body}>
        <Route path="/" exact component={ArticleList} />
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:slug" component={Article} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    </Router>

    //   <BlockRegistration/>
    //   <BlockSignIn/>
    //   <blockEditProfile/>
    //   <Article />
    //   <NewArticle />
  )
}
