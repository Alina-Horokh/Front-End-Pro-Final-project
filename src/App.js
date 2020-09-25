import React, { Component } from 'react';
import './App.css';
import { YearPage, Navbar, Month, DayPage } from './components';
import { todoService } from './services/todo.service';
import { get } from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";



export default class App extends Component {
  
  state = {
    todos: todoService.load(),
  }
  
  render () {
    const { todos } = this.state;
    return (
      <Router>
        <Navbar />

        <Switch>
        <Route path='/' exact render={() => {
            const today = new Date();
            return (<Redirect to={`/year/${today.getFullYear()}`}/>);
          }}/>

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
            return (<YearPage year={match.params.year} todos={get(todos, [match.params.year], {})}/>)
          }}/>

          <Route path='/year/:year/month/:month' exact render={({ match }) => {
            return (
              <div className='month-page'>
                <Link to={`/year/${Number(match.params.year)}/month/${Number(match.params.month) - 1}`}>
                  <button type='button'>&lt;</button>
                </Link>
                <Month 
                  year={Number(match.params.year)} 
                  month={Number(match.params.month)}
                  todos={get(todos, [match.params.year, match.params.month], {})}
                />
                <Link to={`/year/${Number(match.params.year)}/month/${Number(match.params.month) + 1}`}>
                  <button type='button'>&gt;</button>
                </Link>
              </div>
            );
          }}/>

          <Route path='/year/:year/month/:month/day/:day' exact render={({ match }) => {
            return (
              <DayPage 
                year={Number(match.params.year)} 
                month={Number(match.params.month)}
                day={Number(match.params.day)}
                todos={get(todos, [match.params.year, match.params.month, match.params.day], {})}
              />
            );
          }}/>

        </Switch>
      </Router>
    );
  }
}
