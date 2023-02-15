import React from 'react';
import styles from './statisticpageleft.module.css';
import { ReactComponent as TomatoSvg } from '../../../../assets/img/tomato.svg'
import { ReactComponent as Tomato2Svg } from '../../../../assets/img/tomato2.svg'
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru')

type PropsType = {
  statDayDate: string
  statDayTime: number
  statDayCount: number
}

export function secToTime(sec: number) {
  let hh = Math.floor(sec / 60 / 60);
  let mm = Math.floor((sec - hh * 3600) / 60);
  let ss = Math.floor(sec - hh * 3600 - mm * 60);
  if (hh === 0) {
    if (mm === 0) {
      return `${ss} сек`
    } else return `${mm} мин ${ss} сек`
  } else return `${hh} ч ${mm} мин ${ss} сек`;
}

export function StatisticPageLeft({ statDayDate, statDayTime, statDayCount }: PropsType) {

  const dayOfWeek = moment(statDayDate).format('dddd')

  return (
    <div className={styles.left}>
      <div className={styles.leftTop}>
        <h3 className={styles.currentDay}>
          {dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)}
        </h3>
        <span className={styles.currentDayData}>
          {statDayTime > 0
            ? <span className={styles.workTime}>Вы работали над задачами в течении
              <span> {secToTime(statDayTime)}</span>
            </span>
            : <span>Нет статистики</span>
          }
        </span>
      </div>
      <div className={styles.leftBottom}>
        <div className={styles.leftBottomWrapper}>
          {statDayCount > 0
            ? <Tomato2Svg />
            : <TomatoSvg />
          }
          <span>
            {statDayCount ? 'x ' + statDayCount : null}
          </span>
        </div>
        <span className={styles.tomatoCount}>
          {statDayCount} помидор(-ов)
        </span>
      </div>
    </div>
  );
}
