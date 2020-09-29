import { find, pick } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Todo from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import './dayPage.component.css';
import { TodoPage, Form } from '../../components';

export default class DayPageComponent extends Component {
  state = {
    currentTodo: null,
    isFormVisible: false,
  }

  handleTitleChange = (event) => {
    this.setState({ 
      currentTodo: {
        ...this.state.currentTodo,
        title: event.target.value, 
      }
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({ 
      currentTodo: {
        ...this.state.currentTodo,
        description: event.target.value, 
      }
    });
  }

  /**
   * @param {import('react').SynteticEvent} event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    todoService.upsertTodo(pick(this.props, ['year', 'month', 'day']), this.state.currentTodo);
    this.setState({
      currentTodo: null,
      isFormVisible: false,
    })
  }

  handleTodoClick = (event) => {
    const id = event.currentTarget.dataset.id;
    const currentTodo = find(this.props.todos, { id });
    this.setState({
      currentTodo,
      isFormVisible: true,
    });
  }

  handleAddButtonClick = () => {
    const currentTodo = new Todo();
    this.setState({
      currentTodo,
      isFormVisible: true,
    });
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
          {this.props.todos.map((todo, index) => {
            return ( 
              <TodoPage 
                key={todo.id} 
                todo={todo}
                index={index}
                handleTodoClick={this.handleTodoClick}
                todos={this.props.todos}
                year={this.props.year}
                month={this.props.month}
                day={this.props.day}
              />
            );}
          )}
          { this.state.isFormVisible ?
            <Form 
              currentTodo={this.state.currentTodo}
              handleSubmit={this.handleSubmit}
              handleTitleChange={this.handleTitleChange}
              handleDescriptionChange={this.handleDescriptionChange}
            /> : <button onClick={this.handleAddButtonClick}>Добавить</button> }
        </div>
      </div>
    );
  }
}
