import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';

export default class NavbarComponent extends Component {
  render () {
    return (
      <div className='navbar'>
        <Link to='/year/current'>
          <div>Current year</div>
        </Link>
        <Link to='/year/current/month/current'>
          <div>Current month</div>
        </Link>
        <Link to='/year/current/month/current/day/current'>
          <div>Today</div>
        </Link>
      </div>
    );
  }
}