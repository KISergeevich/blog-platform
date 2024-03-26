import React from 'react'

import classes from './title-list.module.scss'

export default function TitleList() {
  return (
    <div className={classes.titleList}>
      <div className={classes.titleList__post}>
        <div className={classes.titleList__informationBlock}>
          <div className={classes.titleList__titlePost}>Some arcticle title</div>
          <div className={classes.titleList__tagPost}>Tag1</div>
          <div className={classes.titleList__textPost}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className={classes.titleList__userBlock}>
          <div className={classes.titleList__nameBlock}>
            <div className={classes.titleList__name}>John Doe</div>
            <div className={classes.titleList__data}>March 5 , 2020</div>
          </div>
          <div className={classes.titleList__icon} />
        </div>
      </div>
    </div>
  )
}
