import React, { Component } from 'react';

export default class DayComponent extends Component {
  render () {
    const day = this.props.value;

    return (
      <div className='day'>{day}</div>
    );
  }
}