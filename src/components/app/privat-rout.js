/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectIsSignedIn } from '../../redux/sign/sign-slice'

function PrivateRoute({ component: Component, ...rest }) {
  const isSignedIn = useSelector(selectIsSignedIn)

  return <Route {...rest} render={(props) => (isSignedIn ? <Component {...props} /> : <Redirect to="/" />)} />
}

export default PrivateRoute
