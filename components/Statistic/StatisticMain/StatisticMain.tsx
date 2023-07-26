import { EIcons, Icon } from '@/components/Icon/Icon'
import React from 'react'

import styles from './statisticMain.module.scss'

export function StatisticMain() {
  return (
    <div  className={styles.statistic_main}>
        <div className={`${styles.statistic_main__left} ${styles.days_active}`}>
            <div className={styles.days_active__top}>
                <h4 className={styles.days_active__top__day}>{`day?`}</h4>
                <p className={styles.days_active__top__descr}>
                    Вы работали над задачами в течение <span>51 минуты</span>
                </p>
            </div>
            <div className={styles.days_active__bottom}>
                {/* <div className={styles.days_active__bottom__big_tomato}>
                    <Icon name={EIcons.tomatoStats} />
                </div> */}

                <div className={styles.days_active__bottom__stats_tomato}>
                    <div  className={styles.days_active__bottom__stats_tomato__top}>
                        <span>{`X 2?`}</span>
                        <Icon name={EIcons.tomato} />
                    </div>
                    <div className={styles.days_active__bottom__stats_tomato__bottom}>
                        {`2 помидора?`}
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.statistic_main__right} ${styles.chart}`}>
             
        </div>
    </div>
  )
}
