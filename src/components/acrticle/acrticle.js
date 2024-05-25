import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert, Spin, message, Popconfirm } from 'antd'
import Markdown from 'markdown-to-jsx'

import grayHeart from '../../assets/img/nonliked.png'
import AuthorAvatar from '../author-avatar/author-avatar'
import getArticle from '../../redux/article/get-article-thunk'
import { reset, selectArticle, selectError, selectGetArticleStatus } from '../../redux/article/article-slice'
import Tags from '../tags/tags'
import { selectToken, selectUser } from '../../redux/sign/sign-slice'
import deleteArticle from '../../redux/article/delete-article-thunk'
import { selectPageNumber, selectPageSize } from '../../redux/articles/articles-slice'
import fetchArticles from '../../redux/articles/fetch-articles-thunk'

import classes from './article.module.scss'

export default function Article() {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const user = useSelector(selectUser)
  const article = useSelector(selectArticle)
  const status = useSelector(selectGetArticleStatus)
  const err = useSelector(selectError)
  const token = useSelector(selectToken)
  const history = useHistory()
  const pageNumber = useSelector(selectPageNumber)
  const pageSize = useSelector(selectPageSize)
  useEffect(() => {
    dispatch(getArticle(slug))

    return () => {
      dispatch(reset())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirm = () => {
    dispatch(deleteArticle({ slug, token }))

    dispatch(reset())
    dispatch(fetchArticles({ pageNumber, pageSize }))
    history.push('/articles')

    message.success('You have successfully deleted your post')
  }

  if (status === 'loading') {
    return (
      <div className={classes.spinBlock}>
        <Spin size="large" className={classes.spin} />
      </div>
    )
  }
  if (status === 'succeeded') {
    const { tags, author, createdAt, title, description, body } = article
    const chekedTitle = title === null || title.trim() === '' ? 'Title Post' : title
    const chekedDescription = description === null ? '' : description
    const chekedBody = body === null ? '' : body
    return (
      <div className={classes.article}>
        <div className={classes.article__header}>
          <div className={classes.article__aboutPost}>
            <div className={classes.article__titlePost}>
              <div className={classes.article__title}>{chekedTitle}</div>
              <form className={classes.article__form}>
                <button className={classes.article__button} type="button">
                  <img src={grayHeart} alt="notLiked" className={classes.article__like} />
                </button>
              </form>
              <span className={classes.articleItem__span}>{article.favoritesCount}</span>
            </div>
            <Tags tags={tags} />
          </div>
          <div className={classes.article__userBlock}>
            <AuthorAvatar author={author} postDate={createdAt} />
          </div>
        </div>
        <div className={classes.article__descriptionBlock}>
          <div className={classes.article__description}>{chekedDescription}</div>
          {user !== undefined && author.username === user.username ? (
            <>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this article?"
                onConfirm={() => confirm(slug, token)}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={classes.article__deleteArticle}>
                  Delete
                </button>
              </Popconfirm>

              <Link to={`/articles/${slug}/edit`} className={classes.article__editArticle}>
                Edit
              </Link>
            </>
          ) : null}
        </div>

        <Markdown className={classes.article__text}>{chekedBody}</Markdown>
      </div>
    )
  }
  if (status === 'failed') return <Alert className={classes.error} message={err} type="error" showIcon />
}
