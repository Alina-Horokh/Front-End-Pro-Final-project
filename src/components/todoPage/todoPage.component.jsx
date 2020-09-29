import React, { Component } from 'react';
import './todoPage.component.css';
import { find, pick } from 'lodash';
import { todoService } from '../../services/todo.service';

export default class TodoPageComponent extends Component {
  handleDeleteButtonClick = (event) => {
    const id = event.currentTarget.dataset.id;
    const currentTodo = find(this.props.todos, { id });
    todoService.removeById(pick(this.props, ['year', 'month', 'day']), currentTodo);
  } 

  render() {
    const { todo, index, handleTodoClick } =  this.props;
    return (
      <div className='todo-item'>
        <div onClick={handleTodoClick} data-id={todo.id}>
          <div className='todo-item-title'>{index + 1}. {todo.title}</div>
          <div className='todo-item-descr'>{todo.description}</div>
        </div>
        <button onClick={this.handleDeleteButtonClick} data-id={todo.id}>Удалить</button>
      </div>
    );
  }
}