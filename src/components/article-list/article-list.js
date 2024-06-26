import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Pagination, Spin } from 'antd'

import ArticleItem from '../article-item/article-item'
import fetchArticles from '../../redux/articles/fetch-articles-thunk'
import {
  changePageNumber,
  reset,
  selectArticles,
  selectError,
  selectPageNumber,
  selectPageSize,
  selectStatus,
  selectTotal,
} from '../../redux/articles/articles-slice'

import classes from './article-list.module.scss'

export default function ArticleList() {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const pageNumber = useSelector(selectPageNumber)
  const pageSize = useSelector(selectPageSize)
  const articles = useSelector(selectArticles)
  const total = useSelector(selectTotal)
  const err = useSelector(selectError)
  useEffect(() => {
    dispatch(fetchArticles({ pageNumber, pageSize }))

    return () => dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const articlesComponent = articles.map((item) => {
    return <ArticleItem article={item} key={item.slug} />
  })
  if (status === 'loading') {
    return (
      <div className={classes.spinBlock}>
        <Spin size="large" className={classes.spin} />
      </div>
    )
  }
  if (status === 'succeeded') {
    return (
      <div className={classes.articleList}>
        <div className={classes.articleList__list}>{articlesComponent}</div>
        <Pagination
          className={classes.articleList__pagination}
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
  if (status === 'failed') return <Alert className={classes.error} message={err} type="error" showIcon />
}
