import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles/articles-slice'
import articleSlice from './article/article-slice'
import signSlice from './sign/sign-slice'

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
    sign: signSlice,
  },
})

export default store
