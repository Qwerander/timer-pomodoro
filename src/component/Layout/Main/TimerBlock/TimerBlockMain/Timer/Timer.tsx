import React, { useEffect, useState } from 'react';
import styles from './timer.module.css';
import { useInterval } from '../../../../../../hooks/useInterval';
import { ReactComponent as PlusSvg } from '../../../../../../assets/img/plus.svg';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { decrementCountPlan } from '../../../../../../store/reducers/taskSlice';
import { incrementCycleCount, setModeBreake, setModeWork } from '../../../../../../store/reducers/timerSlice';

export const getTodayAbsoluteTime = (): number => {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  return now.getTime()
}

type PropsType = {
  id: string
  isStarted: boolean
  stop: () => void
  timer: {
    min: number
    sec: number
    setMin: (min: number) => void
    setSec: (sec: number) => void
  }
}

export function Timer({ id, isStarted, stop, timer }: PropsType) {
  const { min, sec, setMin, setSec } = timer
  
  const dispatch = useAppDispatch()
  const { mode, cycleCount } = useAppSelector(state => state.timer)


  useEffect(() => {
    if (mode !== 'work')
    dispatch(setModeWork())
  }, [])

  useInterval(() => {
    if (isStarted) {
      setSec(sec - 1)
      if (timer.sec === 0) {
        setMin(min - 1)
        setSec(59)
      }
      if (min === 0 && sec === 0) {
        stop()
        if (mode === 'work') {
          dispatch(setModeBreake())
          dispatch(decrementCountPlan({id}))
          cycleCount % 4 === 0 
            ? setMin(2)
            : setMin(1)
        } else {
          dispatch(setModeWork())
          dispatch(incrementCycleCount())
          setMin(3)
        } 
        setSec(0)
      }
    }
  }, [1000])

  return (
    <div className={styles.timer}>
      {min}:{String(sec).length === 1 ? '0' + sec : sec}
      <button className={styles.btnPlus}>
        <PlusSvg />
      </button>
    </div>
  );
}
