import React, { Component } from 'react';
import { Month } from '../../components';
import './year.component.css';

const currentYear = new Date().getFullYear();

export default class YearComponent extends Component {
  
  stateYear(year) {
    return {
      year: year,
      months: Array(12).fill(null).map((x, index) => {
        return {
          number: index,
          startDate: new Date(year, index, 1),
        }
      }), 
    }
  }

  state = this.stateYear(currentYear);

  buttonLastClickHandler = (e) => {
    this.setState(this.stateYear(this.state.year - 1))
    
  }

  buttonNextClickHandler = (e) => {
    this.setState(this.stateYear(this.state.year + 1))
  }

  render () {
    return (
      <div className="year">
        <div className='year-header'>
          <button type='button' onClick={this.buttonLastClickHandler}>&lt;</button>
          <h1>{this.state.year}</h1>
          <button type='button' onClick={this.buttonNextClickHandler}>&gt;</button>
        </div>
        <div className='year-content'>
          {this.state.months.map(month => <Month startDate={month.startDate}/>)}
        </div>
      </div>
    );
  }
}