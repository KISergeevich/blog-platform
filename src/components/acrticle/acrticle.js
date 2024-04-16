import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert, Spin } from 'antd'

import AuthorAvatar from '../author-avatar/author-avatar'
import fetchArticle from '../../redux/article/fetch-article-thunk'
import { selectArticle, selectError, selectStatus } from '../../redux/article/article-slice'
import Tags from '../tags/tags'

import classes from './article.module.scss'

export default function Article() {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const article = useSelector(selectArticle)
  const status = useSelector(selectStatus)
  const err = useSelector(selectError)
  const { author, createdAt } = article

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticle(slug))
    }
  }, [status, dispatch, slug])
  if (status === 'loading') {
    return (
      <div className={classes.spinBlock}>
        <Spin size="large" className={classes.spin} />
      </div>
    )
  }
  if (status === 'succeeded') {
    const { tagList } = article
    return (
      <>
        <div>{slug}</div>
        <div className={classes.article}>
          <div className={classes.article__header}>
            <div className={classes.article__aboutPost}>
              <div className={classes.articleItem__titlePost} />
              <Tags tagList={tagList} />
              <div className={classes.article__description} />
            </div>
            <div className={classes.articleItem__userBlock}>
              <AuthorAvatar author={author} postDate={createdAt} />
            </div>
          </div>
          <div className={classes.article__text} />
        </div>
      </>
    )
  }
  if (status === 'failed') return <Alert className={classes.error} message={err} type="error" showIcon />
}
