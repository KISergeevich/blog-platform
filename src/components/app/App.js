import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import HeaderLine from '../header-line/header-line'
import ArticleList from '../article-list/article-list'
import Article from '../acrticle/acrticle'
import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'
import { fetchCurentUser, selectIsSignedIn, selectStatus } from '../../redux/sign/sign-slice'
import Profile from '../profile/profile'
import CreateArticle from '../create-article/create-article'

import classes from './app.module.scss'
import PrivateRoute from './privat-rout'

const routPathArticles = '/articles'
const routPathArticle = '/articles/:slug'
const routPathSignIn = '/sign-in'
const routPathSignUp = '/sign-up'
const routPathProfile = '/profile'
const routPathNewArticle = '/new-article'

export default function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const isSignedIn = useSelector(selectIsSignedIn)
  const status = useSelector(selectStatus)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchCurentUser(token)).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch])

  if (loading || status === 'loading') {
    return (
      <div className={classes.spinBlock}>
        <Spin size="large" className={classes.spin} />
      </div>
    )
  }

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
          {isSignedIn ? (
            <>
              <PrivateRoute path={routPathProfile} component={Profile} />
              <PrivateRoute path={routPathNewArticle} component={CreateArticle} />
              <PrivateRoute path={`${routPathArticle}/edit`} component={CreateArticle} />
            </>
          ) : (
            <Redirect to={routPathSignIn} />
          )}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
