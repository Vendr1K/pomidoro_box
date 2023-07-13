import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.scss'

type Props = {
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const refClose = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClikc(event: MouseEvent) {
        if(event.target instanceof Node && refClose.current?.contains(event.target)) {
            onClose?.()
        }

        if(event.target instanceof Node && !ref.current?.contains(event.target)) {
            onClose?.()
        }
    }
    document.addEventListener('click', handleClikc)
    return () => {
        document.removeEventListener('click', handleClikc)
    }

}, [onClose])

  const modalRoot = document.querySelector('#modal_root')
  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <div className={styles.modalScreen}>
      <div  className={styles.modal} ref={ref}>
        {children}
        <span  className={styles.modal__close} ref={refClose}>
          {/* <Icon type={EIcon.CROSS} /> */}
          X
        </span>
      </div>
    </div>,
    modalRoot
  )
}
