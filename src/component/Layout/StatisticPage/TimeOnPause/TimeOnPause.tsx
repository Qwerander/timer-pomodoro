import React from 'react';
import styles from './timeonpause.module.css';
import { ReactComponent as PauseSvg } from '../../../../assets/img/pause.svg';

export function TimeOnPause({pause}: {pause: number}) {


  return (
    <div className={styles.pause}
    style={{backgroundColor: pause ? 'var(--sky)' : ' var(--light-grey)'}}>
    <h3 className={styles.title}>
    Время на паузе
    </h3>
    <span className={styles.pauseTime}>
      {pause} c
    </span>
    <PauseSvg  style={{stroke:  pause ? 'var(--violet)' : ' var(--silver)'}}/>
  </div>
  );
}
