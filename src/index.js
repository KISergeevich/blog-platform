import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/error-page/error-page'
import App from './components/app/App'
import Article from './components/acrticle/acrticle'
import TitleList from './components/title-list/title-list'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <TitleList /> },
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
    <RouterProvider router={router} />
  </React.StrictMode>
)
