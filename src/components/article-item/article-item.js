import React from 'react'
import { format } from 'date-fns'

import icon from '../../assets/img/icon.png'
import grayHeart from '../../assets/img/nonliked.png'

import classes from './article-item.module.scss'

export default function ArticleItem({ article }) {
  const { tagList } = article
  let sortTags
  if (tagList.length > 0) {
    sortTags = tagList.map((tag) => {
      return (
        <div key={`${tag}+${Math.round(Math.random() * 100)}`} className={classes.articleItem__tagPost}>
          {tag}
        </div>
      )
    })
  } else {
    sortTags = <span className={classes.articleItem__noTags}>This post has not tags</span>
  }

  const timeCreate = format(new Date(article.createdAt), 'MMMM d, y')
  let avatar
  if (article.author.image.length > 0) {
    avatar = article.author.image
  } else {
    avatar = icon
  }

  return (
    <div className={classes.articleItem}>
      <div className={classes.articleItem__post}>
        <div className={classes.articleItem__informationBlock}>
          <div className={classes.articleItem__titlePost}>
            <div className={classes.articleItem__title}>{article.title}</div>
            <form className={classes.articleItem__form}>
              <button className={classes.articleItem__button} type="button">
                <img src={grayHeart} alt="notLiked" className={classes.articleItem__like} />
              </button>
            </form>
            <span className={classes.articleItem__span}>{article.favoritesCount}</span>
          </div>
          <div className={classes.articleItem__tagList}>{sortTags}</div>
          <div className={classes.articleItem__textPost}>{article.body}</div>
        </div>
        <div className={classes.articleItem__userBlock}>
          <div className={classes.articleItem__nameBlock}>
            <div className={classes.articleItem__name}>{article.author.username}</div>
            <div className={classes.articleItem__data}>{timeCreate}</div>
          </div>
          <img src={avatar} alt="icon-logo" className={classes.articleItem__icon} />
        </div>
      </div>
    </div>
  )
}
