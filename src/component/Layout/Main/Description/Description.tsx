import React from 'react';
import styles from './description.module.css';
import { useAppSelector } from '../../../../store/hooks';

export function Description() {
  const { timeShortBreak, timeLongBreak } = useAppSelector(state => state.config)
  
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Ура! Теперь можно начать работать:
      </h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.item}>
          Запустите таймер («помидор»)
        </li>
        <li className={styles.item}>
          Работайте пока «помидор» не прозвонит
        </li>
        <li className={styles.item}>
          Сделайте короткий перерыв ({`${timeShortBreak}`} минут)
        </li>
        <li className={styles.item}>
          Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. 
          Каждые 4 «помидора» делайте длинный перерыв ({`${timeLongBreak}`} минут).
        </li>
      </ul>
    </div>
  );
}
