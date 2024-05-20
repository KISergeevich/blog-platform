/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import fetchArticles from './fetch-articles-thunk'

const defaultState = {
  articles: [],
  pageNumber: 1,
  pageSize: 5,
  total: 0,
  status: 'idle',
  error: null,
}
const articlesSlice = createSlice({
  name: 'articles',
  initialState: defaultState,
  selectors: {
    selectArticles: (state) => state.articles,
    selectTotal: (state) => state.total,
    selectPageNumber: (state) => state.pageNumber,
    selectPageSize: (state) => state.pageSize,
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
  },
  reducers: {
    reset() {
      return defaultState
    },
    changeArticles(state, action) {
      return {
        ...state,
        articles: action.payload.articles,
        total: action.payload.total,
      }
    },
    changePageNumber(state, action) {
      return {
        ...state,
        pageNumber: action.payload,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.articles = action.payload.articles
        state.total = action.payload.total
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { changeArticles, changePageNumber, reset } = articlesSlice.actions
export const { selectError, selectArticles, selectTotal, selectPageNumber, selectPageSize, selectStatus } =
  articlesSlice.selectors
export default articlesSlice.reducer
