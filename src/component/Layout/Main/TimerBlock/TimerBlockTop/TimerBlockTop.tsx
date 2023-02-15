import React from 'react';
import styles from './timerblocktop.module.css';
import { TTaskStateItem } from '../../../../../store/reducers/taskSlice';
import { useAppSelector } from '../../../../../store/hooks';

type TimerBlockTopPropsType = {
  currentTask: TTaskStateItem
  isTimerOn: boolean
}

export const TimerBlockTop = ({ currentTask, isTimerOn }: TimerBlockTopPropsType) => {
  const mode = useAppSelector(state => state.timer.mode)

  return (
    <div className={styles.top}
      style={{backgroundColor: isTimerOn ? mode === 'work'
      ? 'var(--red)'
      : 'var(--green)'
      : 'var(--silver)'}}
    >
      <h3 className={styles.taskName}>
        {currentTask?.name}
      </h3>
      <span className={styles.taskNumber}>
        Помидор {currentTask?.countPlan}
      </span>
    </div>
  );
}
