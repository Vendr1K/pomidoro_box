"use client";

import { 
  reset,
  incrementTaskTime,
  incrementShortBreakTime,
  incrementLongBreakTime,
  decrementTaskTime,
  decrementShortBreakTime,
  decrementLongBreakTime,
} from '@/redux/Reducers/timerSettigs';
import { 
  reviceLongPauseTime,
  reviceShortPauseTime
} from '@/redux/Reducers/timerPomodoroSlice';
import{  timeLeftTask, TTask,
} from '@/redux/Reducers/taskSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook'
import { timerText } from '@/utils/timerText';
import React from 'react'
import { useDispatch } from 'react-redux';
import styles from './timerParams.module.scss'
import { EIcons, Icon } from '@/components/Icon/Icon';

type Props = {
  onClose: () => void,
  task: TTask | undefined
}

export function TimerParams({task, onClose}: Props ) {

  const settings = useAppSelector(state => state.settings)
  const dispath = useDispatch()

  const handleOk = () => {
    if (task)
  {  dispath(timeLeftTask ({
      ...task,
      timeTask: settings.taskTime,
      timeLeft: settings.taskTime
    } )),
    dispath(reviceShortPauseTime(settings.shortBreakTime))
    dispath(reviceLongPauseTime(settings.longBreakTime))
    onClose()} else  {
      dispath(reset()),
      onClose()
    }
  }


  const handleReset = () => {
    if (task)
    {  
      dispath(reset()),
      dispath(timeLeftTask ({
      ...task,
      timeTask: settings.taskTime,
      timeLeft: settings.taskTime
      } )),
      dispath(reviceShortPauseTime(settings.shortBreakTime))
      dispath(reviceLongPauseTime(settings.longBreakTime))
      onClose()
    } else {
      dispath(reset()),
      onClose()
    }
  }


  return (
    <div className={styles.timer_params}>
      <h3 className={styles.timer_params__title}>Настройки</h3>
      <div className={styles.timer_params__wrapper}>
        <h4 className={styles.timer_params__wrapper__title}>Время задачи</h4>
        <div className={styles.timer_params__wrapper__settings}>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset`}
            onClick={() => dispath(incrementTaskTime())} disabled={settings.taskTime >= 1800}>
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.plus}/>
            </button> 
            <div className={styles.timer_params__wrapper__settings__time}>
              <span>{timerText(settings.taskTime).minutes }</span>
              <span>:</span>
              <span>{timerText(settings.taskTime).seconds}</span>
            </div>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset` }
            onClick={() => dispath(decrementTaskTime())}
            disabled={settings.taskTime <= 1200}
            >
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.minus}/>
            </button>
        </div>
      </div>

      <div className={styles.timer_params__wrapper}>
        <h4 className={styles.timer_params__wrapper__title}>Время короткого перерыва</h4>
        <div className={styles.timer_params__wrapper__settings}>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset`}
            onClick={() => dispath(incrementShortBreakTime())} disabled={settings.shortBreakTime >= 600}>
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.plus}/>
            </button> 
            <div className={styles.timer_params__wrapper__settings__time}>
              <span>{timerText(settings.shortBreakTime).minutes }</span>
              <span>:</span>
              <span>{timerText(settings.shortBreakTime).seconds}</span>
            </div>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset` }
            onClick={() => dispath(decrementShortBreakTime())}
            disabled={settings.shortBreakTime <= 300}
            >
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.minus}/>
            </button>
        </div>
      </div>

      <div className={styles.timer_params__wrapper}>
        <h4 className={styles.timer_params__wrapper__title}>Время длинного перерыва</h4>
        <div className={styles.timer_params__wrapper__settings}>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset`}
            onClick={() => dispath(incrementLongBreakTime())} disabled={settings.longBreakTime >= 1800}>
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.plus}/>
            </button> 
            <div className={styles.timer_params__wrapper__settings__time}>
              <span>{timerText(settings.longBreakTime).minutes }</span>
              <span>:</span>
              <span>{timerText(settings.longBreakTime).seconds}</span>
            </div>
          <button 
            className={`${styles.timer_params__wrapper__settings__btn} btn-reset` }
            onClick={() => dispath(decrementLongBreakTime())}
            disabled={settings.longBreakTime <= 1200}
            >
              <Icon className={styles.timer_params__wrapper__settings__btn__svg} name={EIcons.minus}/>
            </button>
        </div>
      </div>
      

      <div className={styles.timer_params__buttons}>
        <button className={`${styles.timer_params__buttons__ok} btn-reset btn-pomidoro`} onClick={() => handleOk()}>Применить</button>
        <button className={`${styles.timer_params__buttons__reset} btn-reset btn-pomidoro`} onClick={() => handleReset()}>По умолчанию</button>
      </div>
    </div>
  )
}
