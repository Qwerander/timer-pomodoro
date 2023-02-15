import React, { useEffect, useState } from 'react';
import styles from './statisticpageright.module.css';
import { useAppSelector } from '../../../../store/hooks';
import moment from 'moment';
import { ChartMode } from '../StatisticPageTop';
import { secToTime } from '../StatisticPageLeft';


interface IsplitMs {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

export const splitMs = (ms: number): IsplitMs => {
  const seconds = Math.floor(ms / 1000)
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor(seconds % (3600 * 24) / 3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  const sec = Math.floor(seconds % 60)

  return { days, hours, minutes, seconds: sec }
}

type PropsType = {
  selectedDate: string
  selectedChartMode: ChartMode,
  selectDate: (date: string) => void
}

type WeekDayType = {
  date: string,
  name: string,
  active: boolean,
  workSec: number
}


export function StatisticPageRight({ selectedDate, selectDate, selectedChartMode }: PropsType) {

  const MAX_HEIGHT = 400

  const statistic = useAppSelector(state => state.statistic.days)
  const [week, setWeek] = useState<Array<WeekDayType>>([])
  const [subtractDays, setSubtractDays] = useState(0)
  const [maxWorkSec, setMaxWorkSec] = useState(0)

  useEffect(() => {

    switch (selectedChartMode) {
      case ChartMode.CurrentWeek:
        setSubtractDays(0)
        break;
      case ChartMode.LastWeek:
        setSubtractDays(7)
        break;
      case ChartMode.TwoWeeksAgo:
        setSubtractDays(14);
        break;
    }
  }, [selectedChartMode])


  useEffect(() => {
    setWeek([])
    for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
      let weekDayDate = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('YYYY-MM-DD');
      let weekDayName = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('ddd');

      //Ищем день в статистике по дате
      let foundStatItem = statistic.find(item => item.date === weekDayDate);

      setWeek(prev => prev.concat({
        date: weekDayDate,
        name: weekDayName,
        active: selectedDate === weekDayDate,
        workSec: foundStatItem ? foundStatItem.time : 0
      }))
    }

  }, [selectedDate, statistic, subtractDays]);

  useEffect(() => {
    const workSecArray = week.map(day => day.workSec)
    const maxValue = Math.max.apply(null, workSecArray)
    setMaxWorkSec(maxValue ? maxValue : 1)
  }, [week])

  const handleClick = (e: any) => {
    selectDate(e.target.dataset.day)
  }

  return (
    <div className={styles.right}>
      <div className={styles.chart}>
        <span className={styles.graphValue}>
          <span>{maxWorkSec ? secToTime(Math.round(maxWorkSec)) : '4 минуты'} </span>
        </span>
        <span className={styles.graphValue}>
          <span>{maxWorkSec ? secToTime(Math.round(3 / 4 * maxWorkSec)) : '3 минуты'} </span>
        </span>
        <span className={styles.graphValue}>
          <span>{maxWorkSec ? secToTime(Math.round(2 / 4 * maxWorkSec)) : '2 минут'} </span>
        </span>
        <span className={styles.graphValue}>
          <span>{maxWorkSec ? secToTime(Math.round(1 / 4 * maxWorkSec)) : '1 минут'} </span>
        </span>
        <div className={styles.dayOfWeek}>

          {week && week.map(day => {

            return (
              <div
                key={day.name}
                className={day.active 
                  ? `${styles.day} ${styles.dayActive}` : styles.day}
                data-day={day.date}
                onClick={handleClick}
              >
                {day.name[0].toUpperCase() + day.name.slice(1)}
                <span className={styles.column}
                  data-day={day.date}
                  style={{
                    height: isNaN(day.workSec) || day.workSec === 0
                      ? 5
                      : Math.round(day.workSec * MAX_HEIGHT / maxWorkSec) - 10,
                    backgroundColor:
                      !isNaN(day.workSec) && !(day.workSec > 0)
                        ? 'var(--silver)'
                        : day.active
                          ? `var(--red)`
                          : `var(--rose)`
                  }}
                >
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
