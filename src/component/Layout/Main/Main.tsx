import React from 'react';
import styles from './main.module.css';
import { Description } from './Description';
import { AddTaskForm } from './AddTaskForm';
import { TimerBlock } from './TimerBlock';
import { TaskList } from './TaskList';

export function MainPage() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Description />
        <AddTaskForm />
        <TaskList />
      </div>
      <div className={styles.right}>
        <TimerBlock />
      </div>
    </main>
  );
}
