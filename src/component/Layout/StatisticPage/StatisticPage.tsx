import React, { useEffect, useState } from 'react';
import styles from './statisticpage.module.css';
import { Focus } from './Focus';
import { TimeOnPause } from './TimeOnPause';
import { Stops } from './Stops';
import { ChartMode, StatisticPageTop } from './StatisticPageTop';
import { StatisticPageLeft } from './StatisticPageLeft';
import { StatisticPageRight } from './StatisticPageRight';
import { useAppSelector } from '../../../store/hooks';




export function StatisticPage() {
  const lastDay = useAppSelector(state => state.statistic.lastDay)
  const statistic = useAppSelector(state => state.statistic.days)
  const statisticLastDay = useAppSelector(state => state.statistic.days[state.statistic.days.length - 1])

  const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);
  const [selectedDate, setSelectedDate] = useState(lastDay);
  const [statDay, setStatDay] = useState(statisticLastDay);

  useEffect(() => {
    const statisticDay = statistic.find(item => item.date === selectedDate)!
    //Ищем день в статистике по дате

    //Применяем найденый день или ставим пустой
    if (statisticDay) {
      setStatDay(statisticDay);
    } else {
      setStatDay({
        date: selectedDate,
        count: 0,
        time: 0,
        paused: 0,
        stops: 0,
      });
    }

  }, [selectedDate, statistic]);

  return (
    <div className={styles.container}>
      <StatisticPageTop
        selectedChartMode={selectedChartMode}
        setSelectedChartMode={setSelectedChartMode}
      />
      <div className={styles.center}>
        <StatisticPageLeft
          statDayDate={statDay.date}
          statDayCount={statDay.count}
          statDayTime={statDay.time}
        />
        <StatisticPageRight
          selectedDate={selectedDate}
          selectDate={setSelectedDate}
          selectedChartMode={selectedChartMode}
        />
      </div>
      <div className={styles.bottom}>
        <Focus paused={statDay.paused} time={statDay.time} />
        <TimeOnPause pause={statDay.paused} />
        <Stops stops={statDay.stops} />
      </div>
    </div>
  );
}
