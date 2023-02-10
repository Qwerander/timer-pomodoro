import React from 'react';
import styles from './statisticpagetop.module.css';

export function StatisticPageTop() {
  return (
    <div className={styles.top}>
      <h2 className={styles.title}>
        Ваша Активность
      </h2>
      <select>
        <option value="week">За неделю</option>
        <option value="lastWeek">Прошедшая недея</option>
        <option value="twoWeekAgo">2 недели назад</option>
      </select>
    </div>
  );
}
