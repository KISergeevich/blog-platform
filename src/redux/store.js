import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles/articles-slice'
import articleSlice from './article/article-slice'

const store = configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
  },
})

export default store
