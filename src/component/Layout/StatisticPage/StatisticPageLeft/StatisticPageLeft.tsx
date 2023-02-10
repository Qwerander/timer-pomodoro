import React from 'react';
import styles from './statisticpageleft.module.css';
import { ReactComponent as TomatoSvg } from '../../../../assets/img/tomato.svg'
import { StatisticDayType } from '../../../../store/reducers/statisticSlice';

type PropsType = {
  dayOfWeek: number
  time: number
  count: number
}

enum DayOfWeek {
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
}

export function StatisticPageLeft({ dayOfWeek, time, count }: PropsType) {

  const min = Math.round(time / 1000 / 60)

  return (
    <div className={styles.left}>
      <div className={styles.leftTop}>
        <h3 className={styles.currentDay}>
          {DayOfWeek[dayOfWeek]}
        </h3>
        <span className={styles.currentDayData}>
          {time 
          ? <span>Вы работали над задачами в течении <span>{ min }</span> минут</span>
          : <span>Нет статистики</span>
        }
        </span>
      </div>
      <div className={styles.leftBottom}>
        <div className={styles.leftBottomWrapper}>
          { count > 0 
          ?<TomatoSvg />
          :<TomatoSvg />     
          }
          <span>x {count}</span>
        </div>
        <span className={styles.tomatoCount}>
          {count} помидор(-ов)
        </span>
      </div>
    </div>
  );
}
