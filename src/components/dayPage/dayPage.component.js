import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dayPage.component.css';

export default class DayPageComponent extends Component {
  state = {
    title: 'sample',
    description: 'sample description',
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  /**
   * @param {import('react').SynteticEvent} event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {

    const { year, month, day } = this.props;
    const today = new Date(year, month - 1, day);
    const title = today.toLocaleString('ru', { month: 'long', day: 'numeric', weekday: 'long' });
    
    return (
      <div className='day-page'>
        <div className='day-page-header'>

        <Link to={`/year/${Number(year)}/month/${Number(month)}/day/${Number(day) - 1}`}>
          <button type='button'>&lt;</button>
        </Link>
        <h2> {title} {year}</h2>
        <Link to={`/year/${Number(year)}/month/${Number(month)}/day/${Number(day) + 1}`}>
          <button type='button'>&gt;</button>
        </Link>

        </div>

        <div className='day-page-content'>
          <form onSubmit={this.handleSubmit}>

          <input 
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleTitleChange}
          />

          <input 
            type='text'
            name='description'
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />

          <input type='submit' value='Submit'/>

          </form>
        </div>
      </div>
    );
  }
}