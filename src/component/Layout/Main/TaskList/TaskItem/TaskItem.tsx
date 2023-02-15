import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styles from './taskitem.module.css';
import { ReactComponent as MenuSvg } from '../../../../../assets/img/menu.svg'
import { Menu } from './Menu';
import ReactDOM from 'react-dom';
import { useAppDispatch } from '../../../../../store/hooks';
import { editTask } from '../../../../../store/reducers/taskSlice';
import { ModalDelete } from '../../ModalDelete';

export type PositionType = {
  top?: number
  left?: number
  transform?: string
}

export function TaskItem({ name, count, id }: { name: string, count: number, id: string }) {
  const [isMenuOpen, SetIsMenuOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isEditFormOpen, SetIsEditFormOpen] = useState(false)
  const [nameTask, SetNameTask] = useState(name)
  const ref = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch()


  let position
  const rect = ref.current?.getBoundingClientRect()
  if (rect) {
    // eslint-disable-next-line no-restricted-globals
    position = { top: rect.y + scrollY + 24, left: rect.left + 18, transform: 'translateX(-50%)' } as PositionType 
  }



  const node = document.getElementById('modal-root')

  if (!node) return null

  const handleClick = () => {
    SetIsMenuOpen(!isMenuOpen ? true : false)
  }

  const handleOpen = () => {
    SetIsEditFormOpen(true)
    SetIsMenuOpen(false)
    setTimeout(() => {
      editRef.current?.focus()
    }, 1)
  }

  const changeValueName = (event: ChangeEvent<HTMLInputElement>) => {
    SetNameTask(event.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(editTask({ id, name: nameTask }))
    SetIsEditFormOpen(false)
  }



  return (
    <div className={styles.item}>
      <span className={styles.count}>{count}</span>
      <span className={styles.name}>{name}</span>
      <button className={styles.button} onClick={handleClick} ref={ref}>
        <MenuSvg />
      </button>
      {isMenuOpen &&
        ReactDOM.createPortal((
          <Menu
            style={position}
            closeMenu={SetIsMenuOpen}
            id={id}
            setIsEditFormOpen={handleOpen}
            count={count}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        ), node)
      }
      {isModalDeleteOpen &&
        ReactDOM.createPortal((
          <ModalDelete  setIsModalDeleteOpen={setIsModalDeleteOpen} id={id} />
        ), node)
      }
      {isEditFormOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            value={nameTask}
            onChange={changeValueName}
            onBlur={handleSubmit}
            ref={editRef}
          />
        </form>
      )}
    </div>
  );
}
