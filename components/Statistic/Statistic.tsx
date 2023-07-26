import React from 'react'
import { StatisticFooter } from './StatisticFooter/StatisticFooter'
import { StatisticHeader } from './StatisticHeader/StatisticHeader'


import styles from './statistic.module.scss'
import { StatisticMain } from './StatisticMain/StatisticMain'

export  function Statistic() {
  
  return (
    <div className={styles.statistic}>
      <h2 style={{textAlign: 'center', fontSize: '36px'}}>IN DEV</h2>
      <StatisticHeader/>
      <StatisticMain/>
      <StatisticFooter/>
    </div>
  )
}
