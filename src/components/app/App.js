import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderLine from '../header-line/header-line'
import ArticleList from '../article-list/article-list'
import Article from '../acrticle/acrticle'

import classes from './app.module.scss'

export default function App() {
  return (
    <>
      <HeaderLine />
      <Router>
        <div className={classes.app}>
          <Route path="/" exact component={ArticleList} />
          <Route path="/articles/:slug" component={Article} />
        </div>
      </Router>
    </>

    //   <BlockRegistration/>
    //   <BlockSignIn/>
    //   <blockEditProfile/>
    //   <Article />
    //   <NewArticle />
  )
}
