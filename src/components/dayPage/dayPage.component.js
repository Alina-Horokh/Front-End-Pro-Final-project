import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dayPage.component.css';

export default class DayPageComponent extends Component {
  render() {
    const startDate= this.props.startDate;
    const day = startDate.getDate();
    const month = startDate.getMonth();
    const title = startDate.toLocaleString('default', { month: 'long' });
    const year = startDate.getFullYear();

    return (
      <div className='day-page'>
        <div className='day-page-header'>

        <Link to={`/year/${Number(year)}/month/${Number(month) + 1}/day/${Number(day) - 1}`}>
          <button type='button'>&lt;</button>
        </Link>

        <h2>{title} {day} {year}</h2>

        <Link to={`/year/${Number(year)}/month/${Number(month) + 1}/day/${Number(day) + 1}`}>
          <button type='button'>&gt;</button>
        </Link>

        </div>
      </div>
    );
  }
}