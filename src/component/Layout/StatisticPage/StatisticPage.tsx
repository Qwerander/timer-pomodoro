import React, { useEffect } from 'react';
import styles from './statisticpage.module.css';
import { Focus } from './Focus';
import { TimeOnPause } from './TimeOnPause';
import { Stops } from './Stops';
import { StatisticPageTop } from './StatisticPageTop';
import { StatisticPageLeft } from './StatisticPageLeft';
import { StatisticPageRight } from './StatisticPageRight';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedDay } from '../../../store/reducers/statisticSlice';

export function StatisticPage() {

  // const dispatch = useAppDispatch()
  const selectedDay = useAppSelector(state => state.statistic.selectedDay)
  const statistic = useAppSelector(state => state.statistic.days)

  console.log(statistic[selectedDay]);


  return (
    <div className={styles.container}>
      <StatisticPageTop />
      <div className={styles.center}>
        <StatisticPageLeft
          dayOfWeek={new Date(selectedDay).getDay()}
          time={statistic[selectedDay].time}
          count={statistic[selectedDay].count}
        />
        <StatisticPageRight statistic={statistic} />
      </div>
      <div className={styles.bottom}>
        <Focus count={statistic[selectedDay].count} time={statistic[selectedDay].time} />
        <TimeOnPause pause={statistic[selectedDay].paused} />
        <Stops stops={statistic[selectedDay].stops} />
      </div>
    </div>
  );
}
