import React from 'react';
import styles from './focus.module.css';
import { ReactComponent as FocusSvg } from '../../../../assets/img/focus.svg';

export function Focus({paused, time}: {paused: number, time: number}) {

  const focus = Math.round(((time + paused) / (time) * 100)) 
  return (
    <div className={styles.focus}
    style={{backgroundColor: focus ? 'var(--yellow)' : ' var(--light-grey)'}}>
      <h3 className={styles.title}>
        Фокус
      </h3>
      <span className={styles.focusPercent}>
        {focus ? focus : 0}%
      </span>
      <FocusSvg style={{stroke:  focus ? 'var(--gold)' : ' var(--silver)'}}/>
    </div>
  );
}
