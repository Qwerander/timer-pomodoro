import React from 'react';
import styles from './tasklist.module.css';
import { ReactComponent as DividerSvg } from '../../../../assets/img/divider.svg'
import { useAppSelector } from '../../../../store/hooks';
import { TaskItem } from './TaskItem';

export function TaskList() {

  const taskList = useAppSelector(state => state.tasks.tasks)
  const items = Object.entries(taskList)

  return (
    <ul className={styles.list}>
      {items.length > 0 && <DividerSvg />}
      
      {items.map(item => (
        <TaskItem
          key={item[0]}
          count={item[1].countPlan}
          name={item[1].name}
          id={item[0]}
     
        />
      ))}
    </ul>
  );
}
