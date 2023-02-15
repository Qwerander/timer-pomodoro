import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './addtaskform.module.css';
import { useAppDispatch } from '../../../../store/hooks';
import { addTask} from '../../../../store/reducers/taskSlice';

export function AddTaskForm() {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name && name !== '') {
      dispatch(addTask({name}))
    }
    setName('')   
  }

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <input className={styles.input} type="text" value={name} onChange={handleChange} placeholder='Название задачи'/>
      </label>
      <input className={styles.btn} type="submit" value="Добавить"  />
    </form>
  
    </>
  );
}
