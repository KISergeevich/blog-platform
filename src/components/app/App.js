import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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

const routPathArticles = '/articles'
const routPathArticle = '/articles/:slug'
const routPathSignIn = '/sign-in'
const routPathSignUp = '/sign-up'
const routPathProfile = '/profile'
const routPathNewArticle = '/new-article'

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
        <Switch>
          <Route path="/" exact component={ArticleList} />
          <Route path={routPathArticles} exact component={ArticleList} />
          <Route path={routPathArticle} exact component={Article} />
          <Route path={routPathSignIn} component={SignIn} />
          <Route path={routPathSignUp} component={SignUp} />
          <Route path={routPathProfile} component={Profile} />
          <Route path={routPathNewArticle} component={CreateArticle} />
          <Route path={`${routPathArticle}/edit`} component={CreateArticle} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
