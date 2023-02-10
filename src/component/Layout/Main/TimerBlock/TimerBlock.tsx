import React from 'react';
import styles from './timerblock.module.css';
import { TimerBlockTop } from './TimerBlockTop';
import { TimerBlockMain } from './TimerBlockMain';
import { useAppSelector } from '../../../../store/hooks';

export function TimerBlock() {
  
  const currentTaskId = useAppSelector(state => state.tasks.order[0])
  const currentTask = useAppSelector(state => state.tasks.tasks[currentTaskId])

  return (
    <div className={styles.wrapper}>
       <TimerBlockTop currentTask={currentTask}/>
       <TimerBlockMain currentTask={currentTask} id={currentTaskId}/>
    </div>
  );
}
