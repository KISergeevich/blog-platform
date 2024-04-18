import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert, Spin } from 'antd'
import Markdown from 'markdown-to-jsx'

import grayHeart from '../../assets/img/nonliked.png'
import AuthorAvatar from '../author-avatar/author-avatar'
import fetchArticle from '../../redux/article/fetch-article-thunk'
import { deleteStatus, selectArticle, selectError, selectStatus } from '../../redux/article/article-slice'
import Tags from '../tags/tags'

import classes from './article.module.scss'

export default function Article() {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const article = useSelector(selectArticle)
  const status = useSelector(selectStatus)
  const err = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchArticle(slug))

    return () => {
      dispatch(deleteStatus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'loading') {
    return (
      <div className={classes.spinBlock}>
        <Spin size="large" className={classes.spin} />
      </div>
    )
  }
  if (status === 'succeeded') {
    const { tagList, author, createdAt, title, description, body } = article
    return (
      <div className={classes.article}>
        <div className={classes.article__header}>
          <div className={classes.article__aboutPost}>
            <div className={classes.article__titlePost}>
              <div className={classes.article__title}>{title}</div>
              <form className={classes.article__form}>
                <button className={classes.article__button} type="button">
                  <img src={grayHeart} alt="notLiked" className={classes.article__like} />
                </button>
              </form>
              <span className={classes.articleItem__span}>{article.favoritesCount}</span>
            </div>
            <Tags tagList={tagList} />
          </div>
          <div className={classes.article__userBlock}>
            <AuthorAvatar author={author} postDate={createdAt} />
          </div>
        </div>
        <div className={classes.article__description}>{description}</div>
        <Markdown className={classes.article__text}>{body}</Markdown>
      </div>
    )
  }
  if (status === 'failed') return <Alert className={classes.error} message={err} type="error" showIcon />
}
