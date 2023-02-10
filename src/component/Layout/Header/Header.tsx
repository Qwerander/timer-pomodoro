import React from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TomatoSVG } from '../../../assets/img/logo.svg'
import { ReactComponent as StatisticSVG } from '../../../assets/img/statisticIcon.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <NavLink className={styles.link} to={'/main'}>     
          <TomatoSVG />
          pomodoro_box
        </NavLink>
      </div>
      <div className={styles.headerRight}>
        <NavLink className={styles.statLink} to={'/statistic'}>
          <StatisticSVG />
          Статистика
        </NavLink>
      </div>
    </header>
  );
}
