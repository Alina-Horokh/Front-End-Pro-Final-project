import { get } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Month } from '../../components';
import './year.component.css';


export default class YearComponent extends Component {
  render () {
    const months = Array(12).fill(null).map((x, index) => index = index + 1);

    return (
      <div className="year">
        <div className='year-header'>
          <Link to={`/year/${Number(this.props.year) - 1}`}>
            <button type='button'>&lt;</button>
          </Link>
          <h1>{this.props.year}</h1>
          <Link to={`/year/${Number(this.props.year) + 1}`}>
            <button type='button'>&gt;</button>
          </Link>
        </div>
        <div className='year-content'>
          {months.map(month => {
            return (
            <Month 
              key={month} 
              year={this.props.year}
              month={month}
              todos={get(this.props.todos, month, {})}
            />
            );
          })} 
        </div>
      </div>
    );
  }
}