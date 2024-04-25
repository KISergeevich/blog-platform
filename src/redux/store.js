import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles/articles-slice'
import articleSlice from './article/article-slice'
import signUpSlice from './sign-up/sign-up-slice'

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
    signUp: signUpSlice,
  },
})

export default store
