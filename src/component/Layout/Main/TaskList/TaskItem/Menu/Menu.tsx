import React from 'react';
import styles from './menu.module.css';
import { ReactComponent as MenuPlusSvg } from '../../../../../../assets/img/menuPlus.svg'
import { ReactComponent as MenuMinusSvg } from '../../../../../../assets/img/menuMinus.svg'
import { ReactComponent as MenuEditSvg } from '../../../../../../assets/img/menuEdit.svg'
import { ReactComponent as MenuDeleteSvg } from '../../../../../../assets/img/menuDelete.svg'
import { useAppDispatch } from '../../../../../../store/hooks';
import { decrementCountPlan, deleteTask, incrementCountPlan } from '../../../../../../store/reducers/taskSlice';
import { PositionType } from '../TaskItem';

type Props = {
  style?: PositionType
  id: string
  count: number
  closeMenu: (value: boolean) => void
  setIsEditFormOpen: (value: boolean) => void
}

export function Menu({style, closeMenu, id, count, setIsEditFormOpen}: Props) {
  const dispatch = useAppDispatch()

  const increment = () => {
    dispatch(incrementCountPlan({id}))
  } 

  const decrement = () => {
    if (count > 1){
      dispatch(decrementCountPlan({id}))
    }  
  } 

  const deleteCurrentTask = () => {
    dispatch(deleteTask({id}))
  } 

  const editCurrentTask = () => {
    setIsEditFormOpen(true)
  } 

  return (
    <ul className={styles.menu} style={style} onMouseLeave={() => closeMenu(false)}>
      <li className={styles.item} onClick={increment}>
        <MenuPlusSvg /> Увеличить
      </li>
      <li className={styles.item} onClick={decrement}>
        <MenuMinusSvg /> Уменьшить
      </li>
      <li className={styles.item} onClick={editCurrentTask}>
        <MenuEditSvg /> Редактировать
      </li>
      <li className={styles.item} onClick={deleteCurrentTask}>
        <MenuDeleteSvg /> Удалить
      </li>
    </ul>
  );
}
