import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import ErrorPage from './components/error-page/error-page'
import App from './components/app/App'
import Article from './components/acrticle/acrticle'
import ArticleList from './components/article-list/article-list'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ArticleList /> },
      {
        path: 'articles/:slug',
        element: <Article />,
      },
    ],
  },
])

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
