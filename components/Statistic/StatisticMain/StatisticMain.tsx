"use client";
import React, { useEffect } from 'react';
import { EIcons, Icon } from '@/components/Icon/Icon';
import { Chart } from './Chart/Chart';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import {
    loadStats,
    saveStats,
    selectStatisticById,
  } from '@/redux/Reducers/statisticSlice';

import timeToText from '@/utils/timeToText';

import styles from './statisticMain.module.scss'

function pomodoroText(count: number) {
    if (count % 10 === 1) return 'помидор'
    if (count % 10 >= 2 && count % 10 <= 4) return 'помидора'
    if ((count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0)
      return 'помидоров'
  }

function getWeekdayName(date: number) {
    const dayName = new Date(date).toLocaleString('ru-RU', { weekday: 'long' })
    return dayName.slice(0, 1).toUpperCase() + dayName.slice(1)
}
  

export function StatisticMain() {

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
        <div  className={styles.statistic_main}>
            <div className={`${styles.statistic_main__left} ${styles.days_active}`}>
                <div className={styles.days_active__top}>
                    <h4 className={styles.days_active__top__day}>{getWeekdayName(dayId)}</h4>
                    <p className={styles.days_active__top__descr}>
                        Вы работали над задачами в течение <span>{timeToText({seconds: day?.pomodorosTime ?? 0})}</span>
                    </p>
                </div>
                <div className={styles.days_active__bottom}>
                    {day?.pomodorosCount ? 
                    <div className={styles.days_active__bottom__stats_tomato}>
                        <div  className={styles.days_active__bottom__stats_tomato__top}>
                            <span>{`x ${day.pomodorosCount}`}</span>
                            <Icon name={EIcons.tomato}  className={styles.days_active__tomato__icon}/>
                        </div>
                        <div className={styles.days_active__bottom__stats_tomato__bottom}>
                            { `${day.pomodorosCount} ${pomodoroText(day.pomodorosCount)}`}
                        </div>
                    </div>
                    :
                    <div className={styles.days_active__bottom__big_tomato}>
                        <Icon name={EIcons.tomatoStats} className={styles.days_active__tomato__icon}/>
                    </div>
                    }
                </div>
            </div>
            <div className={`${styles.statistic_main__right} ${styles.chart}`}>
                <Chart/> 
            </div>
        </div>
    )
}
