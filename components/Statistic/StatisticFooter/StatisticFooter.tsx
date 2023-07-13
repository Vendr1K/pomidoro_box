import { EIcons, Icon } from '@/components/Icon/Icon'
import React from 'react'

import styles from './statisticFooter.module.scss'

export function StatisticFooter() {
  return (
    <div className={styles.statistic_footer}>
        <ul className={styles.statistic_footer__list}>
            <li className={styles.statistic_footer__list__item}>
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Фокус</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>%%</span>
                    </div>
                    <Icon name={EIcons.focus} width={'130'} height={'130'} />
                </div>
            </li>
            <li className={styles.statistic_footer__list__item}>
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Время на паузе</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>%м</span>
                    </div>
                    <Icon name={EIcons.timePause} width={'130'} height={'130'} />
                </div>
            </li>
            <li className={styles.statistic_footer__list__item}>
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Остановки</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>0</span>
                    </div>
                    <Icon name={EIcons.stops} width={'130'} height={'130'} />
                </div>
            </li>
        </ul>
    </div>
  )
}
