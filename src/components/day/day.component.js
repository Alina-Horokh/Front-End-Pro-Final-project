import './day.component.css';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default class DayComponent extends Component {
  render () {
    const { year, month, day } = this.props;

    const today = new Date(year, month - 1, day);

  
    const isToday = new Date().toDateString() === today.toDateString();

    return (   
      <div className={classnames({ day: true, today: isToday })}>
        <Link to={`/year/${Number(year)}/month/${Number(month)}/day/${Number(day)}`}>
          {day ? day : null}
        </Link>
      </div>
    );
  }
}