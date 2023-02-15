import React, { useEffect } from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TomatoSVG } from '../../../assets/img/logo.svg'
import { ReactComponent as StatisticSVG } from '../../../assets/img/statisticIcon.svg'
import { ReactComponent as ConfigSVG } from '../../../assets/img/config.svg'
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../../store/reducers/configSlice';
import { useAppSelector } from '../../../store/hooks';
import sun from '../../../assets/img/sun.png'
import moon from '../../../assets/img/moon.png'

export function Header() {
  const dispatch = useDispatch()
  const theme = useAppSelector(state => state.config.theme)

  const handleClick = () => {
    dispatch(toggleTheme())
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <NavLink className={styles.link} to={'/main'}>
          <TomatoSVG />
          pomodoro_box
        </NavLink>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.themeSwicher}>
          <img className={styles.img} src={moon} alt="Темная тема" />
          <label className={styles.switch} >
            <input
              type='checkbox'
              onClick={handleClick}
              defaultChecked={theme === 'light' ? true : false}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <img className={styles.img} src={sun} alt="Светлая тема" />
        </div>

        <NavLink className={styles.statLink} to={'/config'}>
          <ConfigSVG />
          Настройки
        </NavLink>

        <NavLink className={styles.statLink} to={'/statistic'}>
          <StatisticSVG />
          Статистика
        </NavLink>
      </div>
    </header>
  );
}
