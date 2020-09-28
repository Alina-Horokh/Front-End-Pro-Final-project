import './day.component.css';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default class DayComponent extends Component {
  render () {
    const { year, month, day } = this.props;

    const today = new Date(year, month - 1, day);

  
    const isToday = new Date().toDateString() === today.toDateString();

    return (      
      <Link 
        to={`/year/${Number(year)}/month/${Number(month)}/day/${Number(day)}`} 
        className={classnames({ day: true, today: isToday, hasTodos: !isEmpty(this.props.todos) })}>
        <div>
          {day || null}
        </div>
      </Link>
    );
  }
}