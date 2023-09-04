"use client";
import { EIcons, Icon } from '@/components/Icon/Icon'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import {
    loadStats,
    saveStats,
    selectStatisticById,
  } from '@/redux/Reducers/statisticSlice';
import React, { useEffect } from 'react'
import timeToText from '@/utils/timeToText';

import styles from './statisticFooter.module.scss'

export function StatisticFooter() {

const dispatch = useAppDispatch()
const week = useAppSelector((state) => state.statistics.week)
const dayId = useAppSelector((state) => state.statistics.day)
const day = useAppSelector((state) => selectStatisticById(state, dayId))

useEffect(() => {
    dispatch(loadStats())

    return () => {
      dispatch(saveStats())
    }
  }, [])
  return (
    <div className={styles.statistic_footer}>
        <ul className={styles.statistic_footer__list}>
            <li className={styles.statistic_footer__list__item}
                style= {{
                    backgroundColor: day != null && day.pomodorosTime > 0 ? '#FFDDA9' : 'var(--gray-color)'
                }}   
            >
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Фокус</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>
                            {`${
                                day?.pomodorosTime ? day.pomodorosTime > 0 ? Math.round((day?.pomodorosTime / (day?.pomodorosTime + day?.pomodorosPause)) * 100 ) : 0 : 0
                            }%`}
                        </span>
                    </div>
                    <Icon className={`${styles.statistic_footer__iconFocus} ${day != null && day.pomodorosTime > 0 ? styles.active : ''}`}  name={EIcons.focus} width={'130'} height={'130'} />
                </div>
            </li>
            <li className={styles.statistic_footer__list__item}
                style= {{
                    backgroundColor: day != null && day.pomodorosTime > 0 ? '#DFDCFE' : 'var(--gray-color)'
                }}
            >
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Время на паузе</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>{`${timeToText({seconds: day?.pomodorosPause ?? 0, short: true })}`}</span>
                    </div>
                    <Icon className={`${styles.statistic_footer__iconPause} ${day != null && day.pomodorosTime > 0 ? styles.active : ''}`} name={EIcons.timePause} width={'130'} height={'130'} />
                </div>
            </li>
            <li className={styles.statistic_footer__list__item} 
                style= {{
                    backgroundColor: day != null && day.pomodorosTime > 0 ? '#C5F1FF' : 'var(--gray-color)'
                }}
            >
                <div className={styles.statistic_footer__list__item__wrapper}>
                    <div className={styles.statistic_footer__list__item__wrapper__descr}>
                        <h4 className={styles.statistic_footer__list__item__wrapper__descr__title}>Остановки</h4>
                        <span className={styles.statistic_footer__list__item__wrapper__descr__text}>{`${day?.pomodorosStops ?? 0}`}</span>
                    </div>
                    <Icon className={`${styles.statistic_footer__iconStop} ${day != null && day.pomodorosTime > 0 ? styles.active : ''}`} name={EIcons.stops} width={'130'} height={'130'} />
                </div>
            </li>
        </ul>
    </div>
  )
}
