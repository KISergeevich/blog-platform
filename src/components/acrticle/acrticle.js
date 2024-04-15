import React from 'react'

import classes from './article.module.scss'

export default function Article() {
  return (
    <div className={classes.article}>
      <div className={classes.article__header}>
        <div className={classes.article__aboutPost}>
          <div className={classes.articleItem__titlePost} />
          <div className={classes.article__tags} />
          <div className={classes.article__description} />
        </div>
        <div className={classes.articleItem__userBlock}>
          <div className={classes.articleItem__nameBlock}>
            <div className={classes.articleItem__name} />
            <div className={classes.articleItem__data} />
          </div>
        </div>
      </div>
      <div className={classes.article__text} />
    </div>
  )
}
