import React from 'react';
import styles from './statisticpageright.module.css';
import { StatisticListType } from '../../../../store/reducers/statisticSlice';
import { useAppSelector } from '../../../../store/hooks';


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


export function StatisticPageRight({statistic}: {statistic: StatisticListType}) {

  const SUTKI = 86400000

  const selectedDay = useAppSelector(state => state.statistic.selectedDay)
  const lastDay = useAppSelector(state => state.statistic.lastDay)
  const lastDayOfCurrentWeek = new Date(lastDay).getDay()
  const week: number[] = [] 
  for (let i = 0; i < lastDayOfCurrentWeek; i++) {
    week.push(lastDay - SUTKI * i)
  }
  console.log(week);
  
  const days = Object.entries(statistic)

  const arr = days.map(item => {
   
   return item[1].count
  })

  const max = Math.max.apply(null, arr)

  
  const MAX_HEIGHT = 400

  const dayValue = {
    monday: Math.round(arr[0] * MAX_HEIGHT / max),
    tuesday: Math.round(arr[1] * MAX_HEIGHT / max),
    wednesday: Math.round(arr[2] * MAX_HEIGHT / max),
    thursday: Math.round(arr[3] * MAX_HEIGHT / max),
    friday: Math.round(arr[4] * MAX_HEIGHT / max),
    saturday: Math.round(arr[5] * MAX_HEIGHT / max),
    sunday: Math.round(arr[6] * MAX_HEIGHT / max),
  }
  const color = 'var(--rose)'

  console.log(dayValue);
  

  const handleClick = (day: number) => {
    
    console.log(day)
  }

  return (
    <div className={styles.right}>
      <div className={styles.chart}>
        <div className={styles.dayOfWeek}>
          <div className={styles.day} onClick={() => handleClick(1)}>
            Пн
            <span className={styles.column}
              style={{
                height: dayValue.monday,
                backgroundColor: `${color}`
              }}>
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(2)}>
            Вт
            <span className={styles.column}
              style={{
                height: dayValue.tuesday,
                backgroundColor: `${color}`
              }}>
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(3)}>
            Ср
            <span className={styles.column}
              style={{
                height: dayValue.wednesday,
                backgroundColor: `${color}`
              }}>
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(4)}>
            Чт
            <span className={styles.column} 
              style={{
                backgroundColor: `${color}`,
                height: dayValue.thursday,
              }}>
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(5)}>
            Пт
            <span className={styles.column}
              style={{
                height: dayValue.friday,
                backgroundColor: `${color}`
              }}>
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(6)}>
            Сб
            <span className={styles.column}
              style={{
                height: dayValue.saturday,
                backgroundColor: `${color}`
              }} >
            </span>
          </div>
          <div className={styles.day} onClick={() => handleClick(7)}>
            Вс
            <span className={styles.column}
              style={{
                height: dayValue.sunday,
                backgroundColor: `${color}`
              }}>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
