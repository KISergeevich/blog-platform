import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'

import ArticleItem from '../article-item/article-item'
import fetchArticles from '../../redux/fetch-articles-thunk'
import {
  changePageNumber,
  selectArticles,
  selectPageNumber,
  selectPageSize,
  selectStatus,
  selectTotal,
} from '../../redux/article-slice'

import classes from './article-list.module.scss'

export default function ArticleList() {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const pageNumber = useSelector(selectPageNumber)
  const pageSize = useSelector(selectPageSize)
  const articles = useSelector(selectArticles)
  const total = useSelector(selectTotal)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles({ pageNumber, pageSize }))
    }
  }, [status, dispatch, pageNumber, pageSize])
  const articlesComponent = articles.map((item) => {
    return <ArticleItem article={item} key={item.slug} />
  })
  return (
    <div className={classes.ArticleList}>
      <div>{articlesComponent}</div>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={total}
        onChange={(p) => {
          dispatch(fetchArticles({ pageNumber: p, pageSize }))
          dispatch(changePageNumber(p))
        }}
        hideOnSinglePage
        pageSize={pageSize}
        current={pageNumber}
        showSizeChanger={false}
      />
    </div>
  )
}
