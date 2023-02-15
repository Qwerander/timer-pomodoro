import React from 'react';
import styles from './timer.module.css';
import { useInterval } from '../../../../../../hooks/useInterval';
import { ReactComponent as PlusSvg } from '../../../../../../assets/img/plus.svg';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { decrementCountPlan, incrementCountPlan } from '../../../../../../store/reducers/taskSlice';
import { incrementCycleCount, setModeBreake, setModeWork } from '../../../../../../store/reducers/timerSlice';


type Callback = (value: number) => number

type PropsType = {
  id: string
  isStarted: boolean
  isPause: boolean
  stop: () => void
  setWorkTime: (fn: Callback) => void
  timer: {
    min: number
    sec: number
    setMin: (fn: Callback) => void
    setSec: (fn: Callback) => void
  }
}

export function Timer({ id, isStarted, isPause, stop, setWorkTime, timer }: PropsType) {
  const { timeOnePomodor, timeShortBreak, timeLongBreak } =
    useAppSelector(state => state.config)

  const { min, sec, setMin, setSec } = timer

  const dispatch = useAppDispatch()
  const { mode, cycleCount } = useAppSelector(state => state.timer)

  const handleClick = () => {
    dispatch(incrementCountPlan({ id }))
  }

  useInterval(() => {
    if (isStarted) {
      setSec((prev) => prev - 1)
      setWorkTime((prev) => prev + 1)
      if (timer.sec === 0) {
        setMin((prev) => prev - 1)
        setSec(() => 59)
      }
      if (min === 0 && sec === 0) {
        stop()
        if (mode === 'work') {
          dispatch(setModeBreake())
          dispatch(decrementCountPlan({ id }))
          cycleCount % 4 === 0 && cycleCount !== 0
            ? setMin(() => timeLongBreak)
            : setMin(() => timeShortBreak)
        } else {
          dispatch(setModeWork())
          dispatch(incrementCycleCount())
          setMin(() => timeOnePomodor)
        }
        setSec(() => 0)
      }
    }
  }, [1000])

  return (
    <div
      className={isStarted || isPause ? mode === 'work'
        ? `${styles.timer} ${styles.timerWork}`
        : `${styles.timer} ${styles.timerBreake}`
        : styles.timer}
    >
      {String(min).length === 1 ? '0' + min : min}:
      {String(sec).length === 1 ? '0' + sec : sec}
      <button className={styles.btnPlus} onClick={handleClick}>
        <PlusSvg />
      </button>
    </div>
  );
}
