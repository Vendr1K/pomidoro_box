"use client";
import React, { useEffect } from 'react';
import useChart from '@/hooks/useChart';
import { defaultTaskTime } from '@/redux/Reducers/timerPomodoroSlice';
import { changeDay } from '@/redux/Reducers/statisticSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';

import styles from './chart.module.scss';

export function Chart() {
    const { axisStep, axisData, barData } = useChart();
    const day = useAppSelector((state) => state.statistics.day);
    const dispatch = useAppDispatch();


    return (
        <div className={styles.chart}>  
            <div className={styles.chart__lines}>
                {axisData.map((line) => (
               
                <div className={styles.chart__line} key={line}>{line}</div>
                ))}
            </div>
            <div className={styles.chart__legend}></div>

        <div className={styles.chart__bars}>
            {barData.map((bar) => (
            <div className={styles.chart__bar}
                onClick={() => {
                if (day !== bar.id) dispatch(changeDay(bar.id))
                }}
                key={bar.id}
                style={{
                height: `${
                    bar.pomodorosTime > 0
                    ? `${
                        (bar.pomodorosTime / defaultTaskTime / (axisStep * 5))
                        }%`
                    : '5px'
                }`,
                backgroundColor:
                    bar.pomodorosTime === 0
                    ? 'var(--placeholder)'
                    : day === bar.id
                    ? 'var(--red-color)'
                    : '#EA8A79',
                }}
            >
                <div className={styles.chart__bar__text}
                 style={
                    {
                        color: day === bar.id ? 'var(--red-color)' : 'var(--placeholder)',
                    }
                }
                >
                {bar.day}
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}
