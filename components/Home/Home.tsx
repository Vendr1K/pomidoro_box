"use client";
import { TTask } from '@/redux/Reducers/taskSlice';
import { ITimer } from '@/redux/Reducers/timerPomodoroSlice';
import { useTimer } from '@/hooks/useTimer'
import React from 'react'
import styles from './homepage.module.scss'
import { Task } from './Task/Task'
import { Timer } from './Timer/Timer'

type Props = {
  children?: React.ReactNode
}

export interface ITimerHook {
    task: TTask | undefined;
    timer: ITimer;
    actions: {
        handleStart: () => void;
        handlePause: () => void;
        handleContinue: () => void;
        handleStop: () => void;
        handleComplited: () => void;
        handleSkipBreak: () => void;
        revice: () => void;
        changeCurrentTaskUseTimer: () => void;
    };
}



export default function Home({ children }: Props) {
  const timer: ITimerHook = useTimer()
  return (
    <div className={styles.home}>
      <Task timer={timer}/>
      <Timer timer={timer}/>
      {children}
    </div>
  )
}
