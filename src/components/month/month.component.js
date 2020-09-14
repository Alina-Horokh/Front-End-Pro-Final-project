import React, { Component } from 'react';
import { Day } from '../../components';
import './month.component.css';

export default class MonthComponent extends Component {
  
  render() {
    const startDate = this.props.startDate;
    const nextDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1);
    const title = startDate.toLocaleString('default', { month: 'long' });
    const d = (startDate.getDay() + 6) % 7;
    
    const diff = (nextDate - startDate) / (1000 * 3600 * 24);
    const daysWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const days = [];
    let day = 0;
    for (let i = 0; i < diff; i++) {
      day = day + 1;
      days.push(day);
    }
    
    for (let i = d; i > 0; i--) {
      days.unshift('');
    }

    return (
    <div className='month' key='index'>
      <div className='month-header'>
        {title} 
      </div>
      <div className='month-content'>
        {daysWeek.map((day, index) => <div className='day-week' key={index}>{day}</div>)}
        {days.map((day, index) => <Day value={day}/>)}
      </div>
    </div>
    );
  }

}