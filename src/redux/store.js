import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles/articles-slice'
import articleSlice from './article/article-slice'
import signUpSlice from './sign-up/sign-up-slice'
import signInSlice from './sign-in/sign-in-slice'

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
    signUp: signUpSlice,
    signIn: signInSlice,
  },
})

export default store
