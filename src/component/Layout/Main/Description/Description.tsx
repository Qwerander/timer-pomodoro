import React from 'react';
import styles from './description.module.css';

export function Description() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Ура! Теперь можно начать работать:
      </h2>
      <ul className={styles.list}>
        <li className={styles.item}>Выберите категорию и напишите название текущей задачи</li>
        <li className={styles.item}>Запустите таймер («помидор»)</li>
        <li className={styles.item}>Работайте пока «помидор» не прозвонит</li>
        <li className={styles.item}>Сделайте короткий перерыв (3-5 минут)</li>
        <li className={styles.item}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
    </div>
  );
}
