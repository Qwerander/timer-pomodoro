import React from 'react';
import styles from './timerblocktop.module.css';
import { TTaskStateItem } from '../../../../../store/reducers/taskSlice';

type TimerBlockTopPropsType = {
  currentTask: TTaskStateItem
}
export const TimerBlockTop = ({currentTask }: TimerBlockTopPropsType) => {
  return (
    <div className={styles.top}>
      <h3 className={styles.taskName}>
        {currentTask?.name}
      </h3>
      <span className={styles.taskNumber}>
        Помидор {currentTask?.countPlan}
      </span>
    </div>
  );
}
