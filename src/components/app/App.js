import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import HeaderLine from '../header-line/header-line'
import ArticleList from '../article-list/article-list'
import Article from '../acrticle/acrticle'
import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'
import { fetchCurentUser } from '../../redux/sign/sign-slice'
import Profile from '../profile/profile'
import CreateArticle from '../create-article/create-article'

import classes from './app.module.scss'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      dispatch(fetchCurentUser(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <Route path="/profile" component={Profile} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/articles/:slug/edit" component={CreateArticle} />
      </div>
    </Router>
  )
}
