import React from 'react';
import styles from './modaldelete.module.css';
import { useAppDispatch } from '../../../../store/hooks';
import { deleteTask } from '../../../../store/reducers/taskSlice';

type PropsType = {
  setIsModalDeleteOpen: (value: boolean) => void
  id: string
}

export function ModalDelete({ setIsModalDeleteOpen, id}: PropsType) {
  const dispatch = useAppDispatch()

const handleConfirum = () => {
      dispatch(deleteTask({ id }))
      setIsModalDeleteOpen(false)
}
 

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.content}>
          <button className={styles.btnClose} onClick={() => setIsModalDeleteOpen(false)}>
          </button>
          <h2 className={styles.title}>
            Удалить задачу?
          </h2>
          <button className={styles.btnConfirum} onClick={handleConfirum}>
            Удалить
          </button>
          <button className={styles.btnCancel} onClick={() => setIsModalDeleteOpen(false)}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  )


}
