import React, { useState } from 'react';
import styles from './statisticpagetop.module.css';
import { ReactComponent as RectSVG } from '../../../../assets/img/rect.svg'

export enum ChartMode {
  CurrentWeek,
  LastWeek,
  TwoWeeksAgo
}

export const ChartModes = [
  {
    name: 'Эта неделя',
    value: ChartMode.CurrentWeek
  },
  {
    name: 'Прошедшая неделя',
    value: ChartMode.LastWeek
  },
  {
    name: '2 недели назад',
    value: ChartMode.TwoWeeksAgo
  }
];

type PropsType = {
  selectedChartMode: ChartMode
  setSelectedChartMode: (value: ChartMode) => void
}

export function StatisticPageTop({ selectedChartMode, setSelectedChartMode }: PropsType) {
  const [isSelectOpen, toggleSelectOpen] = useState(false)

  const selectOpen = () => {
    toggleSelectOpen(isSelectOpen ? false : true)
  }
  return (
    <div className={styles.top}>
      <h2 className={styles.title}>
        Ваша Активность
      </h2>
      <div
        className={isSelectOpen
          ? `${styles.select} ${styles.selectActive}`
          : styles.select}
        onClick={selectOpen}>
        <div className={styles.selected}>
          {ChartModes.find(chartMode => chartMode.value === selectedChartMode)!.name}
          <RectSVG />
        </div>
        {isSelectOpen &&
          <div className={styles.list}>
            <div className={styles.item}
              onClick={() => setSelectedChartMode(ChartMode.CurrentWeek)}>
              Эта неделя
            </div>
            <div className={styles.item}
              onClick={() => setSelectedChartMode(ChartMode.LastWeek)}>
              Прошедшая недея
            </div>
            <div className={styles.item}
              onClick={() => setSelectedChartMode(ChartMode.TwoWeeksAgo)}>
              2 недели назад
            </div>
          </div>
        }
      </div>
    </div>
  );
}
