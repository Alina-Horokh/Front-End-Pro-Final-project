import React, { Component } from 'react';
import './App.css';
import { YearPage, Navbar, Month, DayPage } from './components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";


export default class App extends Component { 
  render () {
    return (
      <Router>
        <Navbar />

        <Switch>

          <Route path='/year/current' exact render={() => {
            const today = new Date();
            return (<Redirect to={`/year/${today.getFullYear()}`}/>);
          }}/>

          <Route path='/year/current/month/current' exact render={() => {
            const today = new Date();
            return (<Redirect to={`/year/${today.getFullYear()}/month/${today.getMonth() + 1}`}/>);
          }}/>

          <Route path='/year/current/month/current/day/current' exact render={() => {
            const today = new Date();
            return (<Redirect to={`/year/${today.getFullYear()}/month/${today.getMonth() + 1}/day/${today.getDate()}`}/>);
          }}/>  

          <Route path='/year/:year' exact render={({ match }) => {
            return (<YearPage year={match.params.year}/>)
          }}/>

          <Route path='/year/:year/month/:month' exact render={({ match }) => {
            return (
              <div className='month-page'>
                <Link to={`/year/${Number(match.params.year)}/month/${Number(match.params.month) - 1}`}>
                  <button type='button'>&lt;</button>
                </Link>
                <Month startDate={new Date(Number(match.params.year), Number(match.params.month) - 1)}/>
                <Link to={`/year/${Number(match.params.year)}/month/${Number(match.params.month) + 1}`}>
                  <button type='button'>&gt;</button>
                </Link>
              </div>
            );
          }}/>

          <Route path='/year/:year/month/:month/day/:day' exact render={({ match }) => {
            return (
              <DayPage startDate={new Date(Number(match.params.year), Number(match.params.month) - 1, Number(match.params.day))}/>
            );
          }}/>

        </Switch>
      </Router>
    );
  }
}
