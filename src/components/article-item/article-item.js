import React from 'react'

import classes from './article-item.module.scss'

export default function ArticleList() {
  return (
    <div className={classes.articleList}>
      <div className={classes.articleList__post}>
        <div className={classes.articleList__informationBlock}>
          <div className={classes.articleList__titlePost}>Some arcticle title</div>
          <div className={classes.articleList__tagPost}>Tag1</div>
          <div className={classes.articleList__textPost}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className={classes.articleList__userBlock}>
          <div className={classes.articleList__nameBlock}>
            <div className={classes.articleList__name}>John Doe</div>
            <div className={classes.articleList__data}>March 5 , 2020</div>
          </div>
          <div className={classes.articleList__icon} />
        </div>
      </div>
    </div>
  )
}
