import React from 'react'
import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        Created by &copy;Pavel Ko
      </div>
    </footer>
  )
}
