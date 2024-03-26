import React from 'react'

import ArticleItem from '../article-item/article-item'

import classes from './article-list.module.scss'

export default function ArticleList() {
  return (
    <div className={classes.articleList}>
      <ArticleItem />
    </div>
  )
}
