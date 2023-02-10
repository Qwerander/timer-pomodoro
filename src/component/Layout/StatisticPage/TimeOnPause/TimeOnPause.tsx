import React from 'react';
import styles from './timeonpause.module.css';
import { ReactComponent as PauseSvg } from '../../../../assets/img/pause.svg';

export function TimeOnPause({pause}: {pause: number}) {

  const min = Math.round(pause / 1000 / 60)
  return (
    <div className={styles.pause}>
    <h3 className={styles.title}>
    Время на паузе
    </h3>
    <span className={styles.pauseTime}>
      {min}м
    </span>
    <PauseSvg />
  </div>
  );
}
