import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

// import Tags from '../tags/tags'

// import classes from './article.module.scss'

export default function Article() {
  // const { tagList } = article
  const { slug } = useParams()
  return (
    <div>{slug}</div>
    // <div className={classes.article}>
    //   <div className={classes.article__header}>
    //     <div className={classes.article__aboutPost}>
    //       <div className={classes.articleItem__titlePost} />
    //       <Tags tagList={tagList} />
    //       <div className={classes.article__description} />
    //     </div>
    //     <div className={classes.articleItem__userBlock}>
    //       <div className={classes.articleItem__nameBlock}>
    //         <div className={classes.articleItem__name} />
    //         <div className={classes.articleItem__data} />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={classes.article__text} />
    // </div>
  )
}
