import React from 'react';
import styles from './focus.module.css';
import { ReactComponent as FocusSvg } from '../../../../assets/img/focus.svg';

export function Focus({count, time}: {count: number, time: number}) {

  const focus = Math.round(((count * 4 * 60) / (time / 1000)) * 100)
  return (
    <div className={styles.focus}>
      <h3 className={styles.title}>
        Фокус
      </h3>
      <span className={styles.focusPercent}>
        {focus}%
      </span>
      <FocusSvg />
    </div>
  );
}
