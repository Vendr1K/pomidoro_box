import { 
      decrementTask,
      incrementTask,
      removeTask,
      restoreTask,
      TTask, 
} from '@/redux/Reducers/taskSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import { EIcons, Icon } from '../Icon/Icon'
import styles from './dropdown.module.scss'


type Props = {
  task: TTask
  onEdit: () => void
}

export default function Dropdown({ task, onEdit }: Props) {
  const dispatch = useDispatch()
  const [removeModalOpen, setRemoveModal] = useState(false)

  const handleRemove = () => {
    dispatch(removeTask(task.id))
  }

  return (
    <>
      <div className={styles.dropdown}>
        <button
          className={`${styles.dropdown__btn} btn-reset`}
          onClick={() => task.count === 0 ?
            dispatch( restoreTask({
                    ...task,
                    count: task.count + 1,
                  }))
            : dispatch(incrementTask({ ...task, count: task.count + 1 }))
          }
        >
          <Icon className={styles.dropdown__btn_icon} name={EIcons.incrementTask} />
          <span className={styles.dropdown__btn_descr}>Увеличить</span>
        </button>
        <button
          className={`${styles.dropdown__btn} btn-reset`}
          onClick={() =>
            task.count <= 1
              ? setRemoveModal(true)
              : dispatch(decrementTask({ ...task, count: task.count - 1 }))
          }
        >
          <Icon className={styles.dropdown__btn_icon} name={EIcons.decrementTask} />
          
          <span className={styles.dropdown__btn_descr}>Уменьшить</span>
        </button>
        <button className={`${styles.dropdown__btn} btn-reset`} onClick={onEdit} >
        <Icon className={styles.dropdown__btn_icon} name={EIcons.editTask} />
          <span className={styles.dropdown__btn_descr}>Редактировать</span>
        </button>
        <button className={`${styles.dropdown__btn} btn-reset`} onClick={() => setRemoveModal(true)}>
        <Icon className={styles.dropdown__btn_icon} name={EIcons.deleteTask} />
          <span className={styles.dropdown__btn_descr}>Удалить</span>
        </button>
      </div>
      {removeModalOpen && (
        <Modal onClose={() => setRemoveModal(false)}>
       <div className={styles.modal__remove_task}>
            <h3 className={styles.modal__remove_task__header}>Удалить задачу?</h3>
            <div className={styles.modal__remove_task__btn_wrapper}>
              <button
                className={`btn-reset btn-pomidoro ${styles.modal__remove_task__btn_wrapper__delete}`}
                onClick={() => handleRemove()}
              >
                Удалить
              </button>
              <button className={`btn-reset  ${styles.modal__remove_task__btn_wrapper__cancel}`} onClick={() => setRemoveModal(false)}>
                Отмена
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
