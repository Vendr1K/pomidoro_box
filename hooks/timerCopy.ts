import { useEffect, useRef, useState } from 'react'
import { changeTask } from '@/redux/Reducers/currentTask';
import { loadStats, saveStats, updateStats } from '@/redux/Reducers/statisticSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import { 
  decrementTask, 
  doneTask, 
  ETaskStatus, 
  incrementTask, 
  pauseTimeTask, 
  selectAllTasks, 
  statusTask, 
  timeLeftTask,
  } from '@/redux/Reducers/taskSlice';
import { 
  stratPomodoroTimer, 
  tickTimer, 
  ETimerStatus, 
  pausePomidoroTImer, 
  stopPomidoroTimer, 
  continuePomidoroTimer ,
  complitedPomodoroTask,
  skipPomodoroBreak,
  startAfterBreak,
  reviseTimeTask,
  changeStatus,
  changePause,
  changePomodoroCount,
  changeTaskCount,
  ITimer
} from '@/redux/Reducers/timerPomodoroSlice';

export function useTimer() {

    const dispatch = useAppDispatch()
    
    const tasks = useAppSelector(selectAllTasks).filter(task => task.count > 0) 
    const complitedTask = useAppSelector(selectAllTasks).filter(task => task.count === 0)  
    const currentTask = useAppSelector(state => state.currentTask)
    const task = tasks.find(task => task.id === currentTask.id)
    const timer: ITimer = useAppSelector(state => state.timer)

    const timerId = useRef<number | null>(0);

    function startTimerTick() {
      timerId.current = window.setInterval(() => dispatch(tickTimer()), 1000)
    }
  
    function stopTimerTick() {
      if(timerId.current === null) return
      window.clearInterval(timerId.current)
      console.log(timerId.current)
    }

    const handleStart = () => {
      if (timer.status !== ETimerStatus.pomodoro_off) return
      stopTimerTick()
      dispatch(stratPomodoroTimer(Date.now()))
      if ( task) {    
        dispatch(timeLeftTask({
          ...task, 
          status: ETaskStatus.task_on, 
        }))
      }
      dispatch(changeTaskCount({taskCount: complitedTask.length + 1}))
      startTimerTick()
    }
  
     const handlePause = () => {
      if (timer.status === ETimerStatus.pomodoro_pause || timer.status === ETimerStatus.pomodoro_break_pause ) return
      if(task && timer.status !== ETimerStatus.pomodoro_break_on){
        dispatch(timeLeftTask({
          ...task, 
          status: ETaskStatus.pause, 
          startPauseTime: Date.now(), 
          startTaskTime: timer.startTime, 
          timeLeft: timer.taskTimeLeft, 
          pomodoroStart: timer.pomodoroStart}))
      }
      dispatch(pausePomidoroTImer(Date.now()))
      stopTimerTick()
    }

    const handleStop = (count = true) => {    
      if (timer.status === ETimerStatus.pomodoro_off) return
      if(task) {
        dispatch(stopPomidoroTimer(task.timeTask))
        dispatch(timeLeftTask({
          ...task, 
          status: ETaskStatus.suspense, 
          startPauseTime: 0, 
          startTaskTime: 0, 
          timeLeft: task.timeTask, 
          pomodoroStart: 0,
          timeTask: task.timeTask
        }))
        dispatch(changeTaskCount({taskCount: complitedTask.length}))
      }else {
        dispatch(stopPomidoroTimer(timer.taskTime))
      }
      // stats>>>>>>>>>>>
      dispatch(
        updateStats({
          pomodorosStops: count ? 1 : 0,
        })
      )
      dispatch(saveStats())
      stopTimerTick()
    }
    
    const changeCurrentTaskUseTimer = () => {
      if(timer.status === ETimerStatus.pomodoro_on  ) {
        // stopTimerTick()
        if(task){
          dispatch(timeLeftTask({
            ...task, 
            status: ETaskStatus.pause, 
            startPauseTime: Date.now(), 
            startTaskTime: timer.startTime, 
            timeLeft: timer.taskTimeLeft, 
            pomodoroStart: timer.pomodoroStart,
            currentPauseTime: timer.currentPauseTime
          }))
        }
      }

      if(timer.status === ETimerStatus.pomodoro_pause ) {
        if(task){
          dispatch(timeLeftTask({
            ...task, 
            status: ETaskStatus.pause, 
            startPauseTime: timer.pomodoroPauseStart, 
            startTaskTime: timer.startTime, 
            timeLeft: timer.taskTimeLeft, 
            pomodoroStart: timer.pomodoroStart,
            currentPauseTime: timer.currentPauseTime
          }))
        }
        stopTimerTick()
      }
      stopTimerTick()
    }
 
    
   
  
    const handleContinue = () => {
      if (timer.status === ETimerStatus.pomodoro_on || timer.status ===  ETimerStatus.pomodoro_break_on || timer.status ===  ETimerStatus.pomodoro_off  ) return
      // console.log(timer, 'continie')
      dispatch(
        updateStats({
          pomodorosPause: timer.currentPauseTime,
        })
      )
      dispatch(saveStats())
      // stopTimerTick()
      dispatch(continuePomidoroTimer())
      startTimerTick()
      
      if ( task && timer.status !== ETimerStatus.pomodoro_break_pause  ) {    
        dispatch(timeLeftTask({
          ...task, 
          status: ETaskStatus.task_on, 
        }))
      }
    }
  
    const handleComplited = () => {
      if (timer.status !== ETimerStatus.pomodoro_on && timer.status !== ETimerStatus.pomodoro_pause  ) return
  
      if(!task) return

      // console.log(timer.taskTime - timer.taskTimeLeft)

      dispatch(
        updateStats({
          pomodorosCount: 1,
          pomodorosTime: timer.taskTime - timer.taskTimeLeft,
          pomodorosPause: timer.currentPauseTime,
        })
      )
      dispatch(saveStats())

        if (task.count === 1 ) {
          dispatch(doneTask({...task, count: task.count - 1, status: ETaskStatus.complited, }))
            
            // dispatch(timeLeftTask({
            //   ...task, 
            
            // }))
          
        } else {
          dispatch(decrementTask({
            ...task, 
            count: task.count - 1,
            status: ETaskStatus.suspense, 
            startPauseTime: 0, 
            startTaskTime: 0, 
            timeLeft: task.timeTask, 
            pomodoroStart: 0,
            timeTask: task.timeTask
          }))
        }
        dispatch(complitedPomodoroTask())
       
       
        //мб stop
        dispatch(pausePomidoroTImer( Date.now()))
      
        stopTimerTick()
       
     } 
  

    const handleSkipBreak = () => {
      if (timer.status !== ETimerStatus.pomodoro_break_on && timer.status !== ETimerStatus.pomodoro_break_pause) return
      dispatch(skipPomodoroBreak(Date.now()))
      dispatch(startAfterBreak())
      // dispatch(changeCount({pomodoroCount: complitedTask.length + 1}))
      if(task?.status ===  ETaskStatus.pause) {
        dispatch(changeStatus({status: ETimerStatus.pomodoro_pause}))
        reviceAfterBreak()
        // dispatch(pausePomidoroTImer(task.startPauseTime))
        stopTimerTick()
        // dispatch(changeCount({pomodoroCount: complitedTask.length + 1}))
        
      }
      stopTimerTick()
    }
    
    const revice = () => {
      console.log(task, 'task')
      dispatch(reviseTimeTask({
        timeLeft: task?.timeLeft, 
        taskTime: task?.timeTask, 
        startPause: task?.startPauseTime, 
        startTime: task?.startTaskTime,
        // count: complitedTask.length,
        currentPauseTime: task?.currentPauseTime
      }))
      // ??????
      stopTimerTick()
    }


    const reviceAfterBreak = () => {
        dispatch(reviseTimeTask({
          timeLeft: task?.timeLeft, 
          taskTime: task?.timeTask, 
          startPause: task?.startPauseTime, 
          startTime: task?.startTaskTime,
          // count: complitedTask.length,
          currentPauseTime: task?.currentPauseTime
        }))
    }
    
    useEffect(() => {
      if(!tasks.length) return
      if(timer.status === ETimerStatus.pomodoro_break_on || timer.status === ETimerStatus.pomodoro_break_pause || task?.status === ETaskStatus.task_on) return
      revice()
      if(task?.status === ETaskStatus.suspense) {
        handleStop()
      }
      if(task?.status === ETaskStatus.pause) {
        dispatch(pausePomidoroTImer(task.startPauseTime))
        dispatch(changeTaskCount({taskCount: complitedTask.length + 1}))
        dispatch(changeStatus({status: ETimerStatus.pomodoro_pause}))
      }
      // stopTimerTick()
    }, [currentTask, task])


    useEffect (() => {
      // console.log(timer)
      if(timer.status === ETimerStatus.pomodoro_off ) return

      if(timer.taskTimeLeft === 0 || timer.taskTimeLeft < 0) {
        if (timer.status === ETimerStatus.pomodoro_on) {
          // console.log('statusComplited')
          if(task)
          handleComplited()
          dispatch(
            updateStats({
              pomodorosCount: 1,
            })
          )
        } 
    
        if (timer.status === ETimerStatus.pomodoro_break_on) {
          dispatch(startAfterBreak())
          stopTimerTick()
          reviceAfterBreak()
          // dispatch(changeCount({pomodoroCount: complitedTask.length + 1}))
          if(task?.status ===  ETaskStatus.pause) {
            dispatch(pausePomidoroTImer(task.startPauseTime))
            stopTimerTick()
            // dispatch(changeCount({pomodoroCount: complitedTask.length + 1}))
            dispatch(changeStatus({status: ETimerStatus.pomodoro_pause}))
          }
          // revice()
        }
      }
    }, [timer.taskTimeLeft])
  
    useEffect(() => {
      dispatch(changeTask(tasks.length ? tasks[currentTask.index] ? {index: currentTask.index , id: tasks[currentTask.index].id} : {index: tasks.length - 1 , id: tasks[tasks.length - 1].id} : {index : 0, id: null }))
    }, [tasks.length, task])

    useEffect(() => {
      dispatch(loadStats())
      dispatch(saveStats())
    }, [])

    useEffect(() => {
      console.log(timerId)
    })

  return {
    task,
    timer,
    actions: {
      handleStart,
      handlePause,
      handleContinue,
      handleStop,
      handleComplited,
      handleSkipBreak,
      revice,
      changeCurrentTaskUseTimer
    }
  }
}
