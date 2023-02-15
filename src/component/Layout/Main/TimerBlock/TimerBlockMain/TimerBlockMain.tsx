import React, { useEffect, useState } from 'react';
import styles from './timerblockmain.module.css';
import { Timer } from './Timer';
import { TTaskStateItem, decrementCountPlan, deleteTask } from '../../../../../store/reducers/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addNewDay, addPause, addPomodor, addStops, addTime, currentDate } from '../../../../../store/reducers/statisticSlice';
import { incrementCycleCount, setModeBreake, setModeWork } from '../../../../../store/reducers/timerSlice';

type TimerBlockMainPropsType = {
  currentTask: TTaskStateItem
  id: string
  toggleTimerOn: (value: boolean) => void
}

export function TimerBlockMain({ currentTask, id, toggleTimerOn}: TimerBlockMainPropsType) {
  const { timeOnePomodor, timeShortBreak, timeLongBreak } =
    useAppSelector(state => state.config)

  const [isStart, setIsStart] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [workTime, setWorkTime] = useState(0)
  const [startPause, setStartPause] = useState(0)
  const [timePause, setTimePause] = useState(0)
  const [stops, setStops] = useState(0)
  const [min, setMin] = useState<number>(timeOnePomodor)
  const [sec, setSec] = useState<number>(0)

  const dispatch = useAppDispatch()

  const { mode, cycleCount } = useAppSelector(state => state.timer)
  const lastDay = useAppSelector(state => state.statistic.lastDay)

  useEffect(() => {
    if (mode === 'work') {
      setMin(timeOnePomodor)
    } else {
      setMin(cycleCount % 4 === 0 && cycleCount !== 0 ? timeLongBreak : timeShortBreak)
    }
  }, [timeOnePomodor, timeShortBreak, timeLongBreak, mode, cycleCount])

  useEffect(() => {

    if (lastDay !== currentDate) {
      dispatch(addNewDay())
    }
  }, [lastDay, dispatch])

  useEffect(() => {
    if (!currentTask) return
    if (currentTask.countPlan < 1) {
      dispatch(deleteTask({ id }))
    }
  }, [currentTask, dispatch, id])

  const timerStart = () => {
    setIsStart(true)
    toggleTimerOn(true)
  }
  
  const timerStop = () => {
    setIsStart(false)
    toggleTimerOn(false)
    
    if (workTime >= timeOnePomodor * 60) {
      dispatch(addPomodor())
      dispatch(addTime({ time: workTime }))
      dispatch(addPause({ pause: Math.round(timePause / 1000) }))
      dispatch(addStops({ stops: stops }))
    }

    setStartPause(0)
    setTimePause(0)
    setWorkTime(0)
    setStops(0)
    if (mode === 'work') {
      setMin(timeOnePomodor)
    } else setMin(cycleCount % 4 === 0 && cycleCount !== 0 ? timeLongBreak : timeShortBreak)
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
    toggleTimerOn(false)
    dispatch(setModeWork())
    dispatch(incrementCycleCount())
    setMin(timeOnePomodor)
    setSec(0)
    setWorkTime(0)
    setStartPause(0)
    setTimePause(0)
    setStops(0)
  }
  
  const timerDone = () => {
    setIsStart(false)
    setIsPause(false)
    toggleTimerOn(false)
    
    dispatch(setModeBreake())
    dispatch(decrementCountPlan({ id }))
    dispatch(addTime({ time: workTime }))
    dispatch(addPause({ pause: Math.round(timePause / 1000) }))
    dispatch(addPomodor())
    dispatch(addStops({ stops: stops - 1 }))

    if (cycleCount !== 0 && cycleCount % 4 === 0) {
      setMin(timeLongBreak)
    } else {
      setMin(timeShortBreak)
    }

    setSec(0)
    setStartPause(0)
    setTimePause(0)
    setWorkTime(0)
    setStops(0)
  }


  return (
    <div className={styles.wrapper}>
      <Timer
        isStarted={isStart}
        isPause={isPause}
        stop={timerStop}
        id={id}
        setWorkTime={setWorkTime}
        timer={{ min, sec, setMin, setSec }}
      />
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
              <button className={styles.btnStopActiveTimer}  onClick={timerStop}>Стоп</button>
            </>
            : !isPause && mode === 'breake'
              ? <>
                <button className={styles.btnStart} onClick={timerPause}>Пауза</button>
                <button className={styles.btnStopActiveTimer} onClick={timerStop}>Стоп</button>
              </>
              : <>
                <button className={styles.btnStart} onClick={timerContinue}>Проодолжить</button>
                {mode === 'work'
                  ? <button className={styles.btnStopActiveTimer} onClick={timerDone}>Сделано</button>
                  : <button className={styles.btnStopActiveTimer} onClick={timerSkip}>Пропустить</button>

                }
              </>
        }
        {

        }
      </div>
    </div>
  );
}
