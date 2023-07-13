import Dropdown from '@/components/Dropdown/Dropdown';
import { EIcons, Icon } from '@/components/Icon/Icon';
import { changeTask } from '@/redux/Reducers/currentTask';
import { editTask, ETaskStatus, TTask} from '@/redux/Reducers/taskSlice';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import React, { useState } from 'react';
import styles from './createTask.module.scss';

type TProps = {
  task: TTask,
  index: number,
  timer: any
}

function taskStatusStyle(status: ETaskStatus): React.CSSProperties {
  switch(status) {
    case ETaskStatus.suspense:
      return {backgroundColor: 'var(--color-white)'}
    case ETaskStatus.pause:
          return {backgroundColor: 'var(--pause-task-color)'}
    case ETaskStatus.complited:
      return {backgroundColor: 'var(--green-color)'}  
    case ETaskStatus.task_on:  
      return {backgroundColor: '#ffaa9a'}
  }
}


  export function TaskList({ task, timer, index }: TProps) {
    const { pauseTime, status, timeLeft, id, text, count, timeTask, startPauseTime, startTaskTime, pomodoroStart, currentPauseTime } = task

    const [taskTitle, setTaskTitle] = useState(text);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    
    const currentTask = useAppSelector(state => state.currentTask)
    const dispatch = useAppDispatch();
    const channgeCurrentTask = () =>  {
      dispatch(changeTask({index, id}))
    }
	  
    const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(event.target.value);
    const handleSubmit = (event: React.KeyboardEvent) => { 
      if (event.code === 'Enter') {
        dispatch(editTask({pauseTime, status, timeLeft, id, count , text: taskTitle, timeTask, startPauseTime, startTaskTime, pomodoroStart, currentPauseTime }))
        setIsEditing(false)
      }
    }
    const inputRef = (input: HTMLInputElement) => {
          if (!input) return
        input.focus()
    }
 
    return (
    <li className={styles.task__list__item} >
      <div className={styles.task__list__item__task_count} style={taskStatusStyle(task.status)}>
       <span className={styles.task__list__item__task_count_descr} >{count === 0 ? '✓' : count}</span>
      </div>
      {isEditing ? (
        <input
                className={styles.task__list__item__task_text}
                type="text"
                value={taskTitle}
                onChange={handleChangeInputValue}
                onKeyPress={handleSubmit}     
                ref={inputRef}  
                onBlur={(e) => {
                  if (e.target.value)
                    dispatch(editTask({pauseTime, status, timeLeft, id, count , text: taskTitle, timeTask, startPauseTime, startTaskTime, pomodoroStart, currentPauseTime}))
                  setIsEditing(false)
                }}
          placeholder="Название задачи"
        />
      ) : (
        <div className={styles.task__list__item__task_text} onClick={() => {
            if(index === currentTask.index) return
            timer.actions.changeCurrentTaskUseTimer()
            channgeCurrentTask()}}>{text}</div>
      )}
      <div className={styles.task__dropdown_wrapper}>
        <button 
          className={`${styles.task__list__item__task_btn_dropdown} btn-reset`} 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={count <= 0}
        >
            <Icon name={EIcons.actionsTask}  className={styles.task__list__item__btn_dropdown_svg}/>
        </button>
        {isDropdownOpen && (
          <div className={styles.task__dropdown_wrapper_container}>
            <Dropdown
              task={task}
              onEdit={() => {
                setIsEditing(true)
                setIsDropdownOpen(false)
              }}
            />
          </div>
        )}
      </div>
     </li>
    )
  }