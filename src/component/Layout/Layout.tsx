import React from 'react';
import styles from './layout.module.css';
import { Header } from './Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPage } from './Main';
import { StatisticPage } from './StatisticPage';
import { ConfigModal } from './ConfigModal';

export function Layout() {

  
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <Redirect to={'/main'} />} />
        <Route path='/statistic' render={() => <StatisticPage />} />
        <Route path='/config' render={() => <><MainPage /><ConfigModal /></>} /> 
        <Route path='/main' render={() => <MainPage />} />

        <Route path='*' render={() => <div>Страница не найдена</div>} />

      </Switch>
    </div>
  );
}


