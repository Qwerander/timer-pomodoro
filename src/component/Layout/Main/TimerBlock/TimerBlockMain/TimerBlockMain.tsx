import React, { useEffect, useState } from 'react';
import styles from './timerblockmain.module.css';
import { Timer } from './Timer';
import { TTaskStateItem, decrementCountPlan, deleteTask } from '../../../../../store/reducers/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addNewDay, addPause, addPomodor, addStops, addTime, setSelectedDay } from '../../../../../store/reducers/statisticSlice';
import { incrementCycleCount, setModeBreake, setModeWork } from '../../../../../store/reducers/timerSlice';

type TimerBlockMainPropsType = {
  currentTask: TTaskStateItem
  id: string
}

const getTodayAbsoluteTime = (): number => {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  return now.getTime()
}


export function TimerBlockMain({ currentTask, id }: TimerBlockMainPropsType) {
  const [isStart, setIsStart] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [startPause, setStartPause] = useState(0)
  const [timePause, setTimePause] = useState(0)
  const [stops, setStops] = useState(0)
  const [min, setMin] = useState<number>(3)
  const [sec, setSec] = useState<number>(0)



  const dispatch = useAppDispatch()
  const statisticLastDay = useAppSelector(state => state.statistic.lastDay)
  const { mode, cycleCount } = useAppSelector(state => state.timer)

  const newDay = getTodayAbsoluteTime()

  useEffect(() => {
    dispatch(setSelectedDay({ day: newDay}))
    if (newDay !== statisticLastDay) {
      dispatch(addNewDay({ newDay }))
    }
  }, [newDay, dispatch, statisticLastDay])

  useEffect(() => {
    if (!currentTask) return
    if (currentTask.countPlan < 1) {
      dispatch(deleteTask({ id }))
    }
  }, [currentTask, dispatch, id])

  const timerStart = () => {
    setIsStart(true)
    setStartTime(Date.now())
  }

  const timerStop = () => {
    setIsStart(false)
    const time = Date.now() - startTime - timePause
    if (time >= 3 * 60 * 1000) {
      dispatch(addPomodor({ currentDay: statisticLastDay }))
      dispatch(addTime({ currentDay: statisticLastDay, time }))
      dispatch(addPause({ currentDay: statisticLastDay, pause: timePause }))
      dispatch(addStops({ currentDay: statisticLastDay, stops }))
    }


    setStartPause(0)
    setTimePause(0)
    setStartTime(0)
    setStops(0)
    if (mode === 'work') {
      setMin(3)
    } else setMin(cycleCount % 4 === 0 ? 2 : 1)
    setSec(0)
  }

  const timerPause = () => {
    setIsStart(false)
    setIsPause(true)

    setStartPause(Date.now())
    if (mode === 'work') {
      setStops(prev => prev + 1)
    }
  }

  const timerContinue = () => {
    setIsStart(true)
    setIsPause(false)

    setTimePause(prev => prev + (Date.now() - startPause))

    setStartPause(0)
  }

  const timerSkip = () => {
    setIsStart(false)
    setIsPause(false)
    dispatch(setModeWork())
    dispatch(incrementCycleCount())
    setMin(3)
    setSec(0)
    setStartPause(0)
    setTimePause(0)
    setStartTime(0)
    setStops(0)
  }

  const timerDone = () => {
    setIsStart(false)
    setIsPause(false)
    const time = Date.now() - startTime - timePause
    dispatch(setModeBreake())
    dispatch(decrementCountPlan({ id }))
    dispatch(addTime({ currentDay: statisticLastDay, time }))
    dispatch(addPause({ currentDay: statisticLastDay, pause: timePause }))
    dispatch(addPomodor({ currentDay: statisticLastDay }))
    dispatch(addStops({ currentDay: statisticLastDay, stops }))

    setMin(cycleCount % 4 === 0 ? 2 : 1)
    setSec(0)
    setStartPause(0)
    setTimePause(0)
    setStartTime(0)
    setStops(0)
  }


  return (
    <div className={styles.wrapper}>
      <Timer isStarted={isStart} stop={timerStop} id={id} timer={{ min, sec, setMin, setSec }} />
      {currentTask
        ? <div className={styles.task}>
          <span className={styles.taskNumber}>
            Задача {currentTask.index} -
          </span>
          <span className={styles.taskValue}>
            {currentTask.name}
          </span>
        </div>
        : <div className={styles.task}>Нет задач</div>
      }
      <div className={styles.buttonWrapper}>
        {!isStart && !isPause
          ? <>
            <button className={styles.btnStart} onClick={timerStart}>Старт</button>
            <button className={styles.btnStop} disabled={!isStart} onClick={timerStop}>Стоп</button>
          </>
          : !isPause && mode === 'work'
            ? <>
              <button className={styles.btnStart} onClick={timerPause}>Пауза</button>
              <button className={styles.btnStop} onClick={timerStop}>Стоп</button>
            </>
            : !isPause && mode === 'breake'
              ? <>
                <button className={styles.btnStart} onClick={timerPause}>Пауза</button>
                <button className={styles.btnStop} onClick={timerStop}>Стоп</button>
              </>
              : <>
                <button className={styles.btnStart} onClick={timerContinue}>Проодолжить</button>
                { mode === 'work' 
                ? <button className={styles.btnStop} onClick={timerDone}>Сделано</button>
                : <button className={styles.btnStop} onClick={timerSkip}>Пропустить</button>

                }
              </>
        }
        {

        }
      </div>
    </div>
  );
}
