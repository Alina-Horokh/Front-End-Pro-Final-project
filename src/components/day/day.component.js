import './day.component.css';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default class DayComponent extends Component {
  render () {

    const date = this.props.value;
    const isToday = date && (new Date().toDateString() === date.toDateString());

    return (   
      <div className={classnames({ date: true, today: isToday })}>
        <Link to={`/year/${Number(date.getFullYear())}/month/${Number(date.getMonth())}/day/${Number(date.getDate())}`}>
          {date ? date.getDate() : null}
        </Link>
      </div>
    );
  }
}