import React from 'react'
import { Description } from './Description/Description'
import { CreateTask } from './CreateTask/CreateTask'
import { ITimerHook } from '../Home'
import styles from './task.module.scss'

interface ITimerProps {
  timer: ITimerHook
}

export function Task({timer}: ITimerProps) {
  // console.log(timer, 'timerTask')


  return (
    <div>
        <Description/> 
        <CreateTask timer={timer}/>
    </div>
  )
}
