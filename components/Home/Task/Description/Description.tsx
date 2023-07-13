import React, { useState } from 'react'
import styles from './descriptionn.module.scss'


export function Description() {
  return (
    <div className={styles.descr}>
        <h2 className={styles.descr__title}> Ура! Теперь можно начать работать:</h2>
        <ul className={styles.descr__list}>
            <li className={styles.descr__list__item}>Выберите категорию и напишите название текущей задачи</li>
            <li className={styles.descr__list__item}>Запустите таймер («помидор»)</li>
            <li className={styles.descr__list__item}>Работайте пока «помидор» не прозвонит</li>
            <li className={styles.descr__list__item}>Сделайте короткий перерыв (3-5 минут)</li>
            <li className={styles.descr__list__item}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. </li>
            <li className={styles.descr__list__item}>Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
        </ul>
    </div>
  )
}





