import React, { ChangeEvent, useState } from 'react';
import styles from './configmodal.module.css';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setLongBreake, setOnePomodorTime, setShortBreake } from '../../../store/reducers/configSlice';
import { useHistory } from 'react-router-dom';

export function ConfigModal() {

  const history = useHistory()

  const dispatch = useAppDispatch()
  const { timeOnePomodor, timeShortBreak, timeLongBreak } = useAppSelector(state => state.config)
  const [pomodoro, setPomodoroTime] = useState(timeOnePomodor)
  const [shortBreak, setShortBreakTime] = useState(timeShortBreak)
  const [longBreak, setLongBreakTime] = useState(timeLongBreak)

  const handleChangePomodoro = (event: ChangeEvent<HTMLInputElement>) => {
    setPomodoroTime(Number(event.target.value));
  }

  const handleChangeShortBreak = (event: ChangeEvent<HTMLInputElement>) => {
    setShortBreakTime(Number(event.target.value));
  }

  const handleChangeLongBreak = (event: ChangeEvent<HTMLInputElement>) => {
    setLongBreakTime(Number(event.target.value));
  }

  const changePomodoro = () => {
    dispatch(setOnePomodorTime({ time: pomodoro }))
  }

  const changeShortBreak = () => {
    dispatch(setShortBreake({ time: shortBreak }))
  }

  const changelongBreak = () => {
    dispatch(setLongBreake({ time: longBreak }))
  }
  
  const closeConfig = () => {
    history.push('/main')
  }

  const node = document.getElementById('modal-root')
  if (!node) return null

  return ReactDOM.createPortal((
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.config}>
          <button className={styles.btnClose} onClick={closeConfig}></button>
          <h2 className={styles.title}>
            Настройки
          </h2>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number" value={pomodoro}
              onChange={handleChangePomodoro}
              onBlur={changePomodoro}
              />
              Продолжительность «помидора»:
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number" value={shortBreak}
              onChange={handleChangeShortBreak}
              onBlur={changeShortBreak}
              />
              Продолжительность короткого перерыва:
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number" value={longBreak}
              onChange={handleChangeLongBreak}
              onBlur={changelongBreak}
              />
              Продолжительность длинного перерыва:
          </label>
          <button className={styles.btnConfirum} onClick={closeConfig}>Закрыть</button>
        </div>
      </div>
    </div>
  ), node)

}
