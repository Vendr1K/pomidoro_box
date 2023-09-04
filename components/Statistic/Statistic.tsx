import React, { useEffect } from 'react';
import { StatisticFooter } from './StatisticFooter/StatisticFooter';
import { StatisticHeader } from './StatisticHeader/StatisticHeader';
import { StatisticMain } from './StatisticMain/StatisticMain';

import styles from './statistic.module.scss';

export  function Statistic() {
  return (
    <div className={styles.statistic}>
      <StatisticHeader/>
      <StatisticMain/>
      <StatisticFooter/>
    </div>
  )
}
