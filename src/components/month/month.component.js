import { get } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Day } from '..';
import './month.component.css';

export default class MonthComponent extends Component {
  
  render() {
    const { year, month } = this.props;
  
    /**
     * @type {Date}
     */
    const startDate = new Date(year, month - 1);

    const title = startDate.toLocaleString('default', { month: 'long' });

    const nextDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1);    
    const diff = Math.round((nextDate - startDate) / (1000 * 3600 * 24));

    const d = (startDate.getDay() + 6) % 7;

    const daysWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    const days = [];
    let day = 0;

    for (let i = 0; i < diff; i++) { 
      day = day + 1;
      days.push(day);      
    }

    return (
      <div className='month' key='index'>
        <div className='month-header'>
          <Link to={`/year/${year}/month/${month}`}>
            {title} 
          </Link>
        </div>
        <div className='month-content'>
          {daysWeek.map((day, index) => <div className='day-week' key={'title' + index}>{day}</div>)}
          <div className='spacer' style={{ width: `calc(100% / 7 * ${d})`}}/>
          {days.map((day, index) => <Day 
            key={index} 
            day={day} 
            year={this.props.year} 
            month={this.props.month} 
            todos={get(this.props.todos, day, [])}
          />)}
        </div>
      </div>
    );
  }
}