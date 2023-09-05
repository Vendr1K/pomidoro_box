"use client";
import React, { useState, FormEvent } from 'react';
import { addTask, selectAllTasks , ETaskStatus} from '@/redux/Reducers/taskSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import timeToText from '@/utils/timeToText';
import { TaskList } from './TaskList';
import { ITimerHook } from '../../Home';

import styles from './createTask.module.scss';

interface ITimerProps {
  timer: ITimerHook
}

export  function CreateTask({timer}: ITimerProps) {
  const tasks = useAppSelector(selectAllTasks);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!inputValue) return

    dispatch(addTask({ 
      id: Date.now(), 
      text: inputValue, 
      count: 1, 
      pauseTime: 0, 
      timeLeft: 25 * 60, 
      status: ETaskStatus.suspense, 
      timeTask: 25 * 60, 
      startPauseTime: 0, 
      startTaskTime: 0, 
      pomodoroStart: 0,
      currentPauseTime:0,
    }))
    setInputValue('')
  }

  const timeTasks = timeToText({seconds: tasks.map((task) =>  task.count * task.timeTask).reduce((prev, curr) => prev + curr, 0)})

  return (
    <div className={styles.create_task}>
      <form onSubmit={handleSubmit} className={styles.create_task__form}>
        <input
          className={styles.create_task__form__input}
          placeholder="Название задачи"
          name="task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit"  className={`btn-reset btn-pomidoro ${styles.create_task__form__btn_add}`}>
          Добавить
        </button>
      </form>
      <div className={styles.task}>
        <ul className={styles.task__list}>
            {tasks 
              .filter((task) => task.count > 0)
              .map((task, index) => (
                <TaskList key={task.id} task={task} index={index} timer={timer} />
              ))}
          </ul>
      </div>
      <div className={styles.task__all_time}>{tasks.length ? timeTasks : ''}</div>
      <div className={styles.task}>
        <ul className={styles.task__list}>
            {tasks 
              .filter((task) => task.count === 0)
              .map((task, index) => (
                <TaskList key={task.id} task={task} index={index} timer={timer} />
              ))}
          </ul>
      </div>
    </div>
  )
}
