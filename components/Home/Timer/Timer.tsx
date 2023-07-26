import React, { useState } from 'react'
import { ETimerStatus } from '@/redux/Reducers/timerPomodoroSlice';
import { timerText } from '@/utils/timerText';
import { EIcons, Icon } from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import { TimerParams } from './TimerParams/TimerParams';
import styles from './timer.module.scss'
import { ITimerHook } from '../Home';

function headerStyles(status: ETimerStatus): React.CSSProperties {
  switch(status) {
    case ETimerStatus.pomodoro_off:
      return {backgroundColor: 'var(--border-circle)'}
    case ETimerStatus.pomodoro_on:
    case ETimerStatus.pomodoro_pause:
          return {backgroundColor: 'var(--red-color)'}
    case ETimerStatus.pomodoro_break_on:
    case ETimerStatus.pomodoro_break_pause:
      return {backgroundColor: 'var(--green-color)'}  
  }
}

function timerStyles(status: ETimerStatus): React.CSSProperties {
  switch(status) {
    case ETimerStatus.pomodoro_off:
      return {color: 'var(--color-text)'}
    case ETimerStatus.pomodoro_pause:
    case ETimerStatus.pomodoro_on:
        return {color: 'var(--red-color)'}
    case ETimerStatus.pomodoro_break_pause:
    case ETimerStatus.pomodoro_break_on:
      return {color: 'var(--green-color)'}  
  }
}

interface ITimerProps {
  timer: ITimerHook
}



export function Timer({timer}: ITimerProps) {
  const [removeModalOpen, setRemoveModal] = useState(false)


  return (
    <div className={styles.timer}>
      <div className={styles.timer__task__wrapper}>
        <div className={styles.timer__task__wrapper__header} style={headerStyles(timer.timer.status)}>
          <span className={styles.timer__task__wrapper__header__task}>{timer.task?.text ? timer.task?.text : 'Добавьте задачу'}</span>
          <span className={styles.timer__task__wrapper__header__number}>{
            timer.timer.status === ETimerStatus.pomodoro_on ||
            timer.timer.status === ETimerStatus.pomodoro_pause ||
            timer.timer.status === ETimerStatus.pomodoro_off 
            ? `Помидор ${timer.timer.pomodoroCount - 1}` : 'Перерыв'}</span>
        </div>
        <div className={styles.timer__time_wrapper}>
            <div className={styles.timer__time_wrapper__time} style={timerStyles(timer.timer.status)}>
              <span className={styles.timer__time_wrapper__time__minutes}>{timer.timer.taskTimeLeft ? timerText(timer.timer.taskTimeLeft).minutes : `25`}</span>
              <span>:</span>
              <span className={styles.timer__time_wrapper__time__seconds}>{timer.timer.taskTimeLeft ? timerText(timer.timer.taskTimeLeft).seconds : `00`}</span>
            <button 
              className={`${styles.timer__time_wrapper__time__btn_setting} btn-reset`}  
              onClick={() => setRemoveModal(true)} 
              disabled={timer.timer.status !== ETimerStatus.pomodoro_off || !timer.task}
            >
              <Icon name={EIcons.settingTimer} width='60' height='60' className={`${styles.timer__time_wrapper__time__btn_setting_icon}`}/>
            </button>
            </div>
           
            <div className={styles.timer__time_wrapper__task}>{timer.task?.text ? `Задача ${timer.timer.taskCount} - ${timer.task?.text}` : 'Добавьте задачу'}</div>
              {timer.timer.status === ETimerStatus.pomodoro_off && (
                <div className={styles.timer__time_wrapper__buttons}>
                <button  onClick={() => timer.actions.handleStart()} className={`${styles.timer__time_wrapper__button_start} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`} disabled={timer.task ? false : true}>Старт</button>
                <button onClick={() => timer.actions.handleStop()} className={`${styles.timer__time_wrapper__button_stop} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`} disabled={timer.timer.status === ETimerStatus.pomodoro_off}>Стоп</button>
                </div>
              )}

              {timer.timer.status === ETimerStatus.pomodoro_on && (
                <div className={styles.timer__time_wrapper__buttons}>
                   <button onClick={() => timer.actions.handlePause()} className={`${styles.timer__time_wrapper__button_pause} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Пауза</button>
                   <button   onClick={() => timer.actions.handleStop()} className={`${styles.timer__time_wrapper__button_stop} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`} disabled={false}>Стоп</button>
                </div>
              )}
               {timer.timer.status === ETimerStatus.pomodoro_pause && (
                <div className={styles.timer__time_wrapper__buttons}>
                  <button onClick={() => timer.actions.handleContinue()} className={`${styles.timer__time_wrapper__button_continue} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Продолжить</button>
                  <button onClick={() => {timer.actions.handleComplited()}}  className={`${styles.timer__time_wrapper__button_complited} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Готово</button>
                </div>
              )}
               {timer.timer.status === ETimerStatus.pomodoro_break_pause && (
                <div className={styles.timer__time_wrapper__buttons}>
                  <button onClick={() => timer.actions.handleContinue()} className={`${styles.timer__time_wrapper__button_continue} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Продолжить</button>
                  <button onClick={() => timer.actions.handleSkipBreak()} className={`${styles.timer__time_wrapper__button_skip} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Пропустить</button>
                </div>
              )}

              {timer.timer.status === ETimerStatus.pomodoro_break_on && (
                <div className={styles.timer__time_wrapper__buttons}>
                 <button onClick={() => timer.actions.handlePause()} className={`${styles.timer__time_wrapper__button_pause} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Пауза</button>
                  <button onClick={() => timer.actions.handleSkipBreak()} className={`${styles.timer__time_wrapper__button_skip} ${styles.timer__time_wrapper__button} btn-reset btn-pomidoro`}>Пропустить</button>
                </div>
              )}
        </div>
      </div>
      {removeModalOpen && (
        <Modal onClose={() => setRemoveModal(false)}>
          <TimerParams task={timer.task} onClose={() => setRemoveModal(false)}/>
        </Modal>)}
    </div>
  )
}