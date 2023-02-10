import React from 'react';
import styles from './stops.module.css';
import { ReactComponent as StopSvg } from '../../../../assets/img/stop.svg';

export function Stops({stops}: {stops: number}) {
  return (
    <div className={styles.stop}>
      <h3 className={styles.title}>
        Остановки
      </h3>
      <span className={styles.stopCount}>
        {stops ? stops : 0}
      </span>
      <StopSvg />
    </div>
  );
}
