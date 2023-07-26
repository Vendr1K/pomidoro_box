import Link from 'next/link'
import React from 'react'
import { EIcons, Icon } from '../Icon/Icon'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={`container ${styles.header}`}>
        
        <Link  className={styles.header__wrapper_left} href='/'>
            <Icon name={EIcons.tomato} className={styles.header__wrapper_left__icon}/>
            <h1 className={styles.header__wrapper_left__title}>Pomodoro_box </h1>
        </Link>
        <Link className={styles.header__wrapper_right} href='/statistic'>
            <Icon name={EIcons.stats} className={styles.header__wrapper_right__icon}/>
            <span className={styles.header__wrapper_right__descr}>Статистика</span>
        </Link>
    </header>
  )
}
