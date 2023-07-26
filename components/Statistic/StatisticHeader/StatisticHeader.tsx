"use client"
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';

import styles from './statisticHeader.module.scss'
import { EIcons, Icon } from '@/components/Icon/Icon';
import { changeWeek, StaticSeason } from '@/redux/Reducers/statisticSlice';

export function StatisticHeader() {
    const [isSelectWeekOpen, setIsSelectWeekOpen] = useState(false);

    const dispatch = useAppDispatch()

    const week = useAppSelector((state) => state.statistics.week)

    const handleChangeWeek = (week: StaticSeason) => {
        dispatch(changeWeek(week))
        setIsSelectWeekOpen(false)
    }

    return (
        <div className={styles.statistic_head}>
            <h2 className={styles.statistic_head__title}>Ваша активность</h2>
            <div className={`${styles.statistic_head__select_wrapper} ${styles.select}`}>
            <button className={`${styles.select__button} btn-reset`} onClick={() => setIsSelectWeekOpen(true)}>
                {week}
                <Icon name={EIcons.selectArrow} style={isSelectWeekOpen ? {rotate: '180deg', zIndex: 10} : {}}/>
            </button>
            {isSelectWeekOpen && (
                <div className={styles.select__list}>
                    <button className={`${styles.select__button} btn-reset`} onClick={() => handleChangeWeek(StaticSeason.currentWeek)}>{StaticSeason.currentWeek}</button>
                    <button className={`${styles.select__button} btn-reset`} onClick={() => handleChangeWeek(StaticSeason.weekAgo)}>{StaticSeason.weekAgo}</button>
                    <button className={`${styles.select__button} btn-reset`} onClick={() => handleChangeWeek(StaticSeason.twoWeekAgo)}>{StaticSeason.twoWeekAgo}</button>
                </div>
            )}
            </div>


        </div>
    )
}
