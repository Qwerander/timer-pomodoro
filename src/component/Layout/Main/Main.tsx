import React from 'react';
import styles from './main.module.css';
import { Description } from './Description';
import { AddTaskForm } from './AddTaskForm';
import { TimerBlock } from './TimerBlock';
import { TaskList } from './TaskList';
import { useAppSelector } from '../../../store/hooks';

export function MainPage() {
  const taskList = useAppSelector(state => state.tasks.order)

  
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Description />
        <AddTaskForm />
        <TaskList />
      </div>
      {taskList.length > 0 &&
        <div className={styles.right}>
          <TimerBlock />
        </div>
      }
    </main>
  );
}
