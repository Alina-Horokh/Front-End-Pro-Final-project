import { find, pick } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Todo from '../../models/todo.models';
import { todoService } from '../../services/todo.service';
import './dayPage.component.css';

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

  handleDeleteButtonClick = (event) => {
    const id = event.currentTarget.dataset.id;
    const currentTodo = find(this.props.todos, { id });
    todoService.removeById(pick(this.props, ['year', 'month', 'day']), currentTodo);
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
              // <TodoPage key={todo.id} todo={todo}/>
              <div className='todo-item' key={todo.id}>
                <div onClick={this.handleTodoClick} data-id={todo.id}>
                  <div className='todo-item-title'>{index + 1}. {todo.title}</div>
                  <div className='todo-item-descr'>{todo.description}</div>
                </div>
                <button onClick={this.handleDeleteButtonClick} data-id={todo.id}>Удалить</button>
              </div>
            );}
          )}
          { this.state.isFormVisible ?
            <form onSubmit={this.handleSubmit}>
            <input 
              type='text'
              name='title'
              value={this.state.currentTodo.title}
              onChange={this.handleTitleChange}
            />
            <input 
              type='text'
              name='description'
              value={this.state.currentTodo.description}
              onChange={this.handleDescriptionChange}
            />
            <input type='submit' value='Submit'/>
            </form> : <button onClick={this.handleAddButtonClick}>Добавить</button> }
        </div>
      </div>
    );
  }
}