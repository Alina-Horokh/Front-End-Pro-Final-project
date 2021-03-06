import { findIndex, get, reject } from 'lodash';
import Todo from '../models/todo.models';

console.log('TODO SERVICES');

const TODO_LOCAL_STORAGE_KEY = 'TODO_LOCAL_STORAGE_KEY';

class TodoService extends EventTarget {

  todos = {};

  constructor() {
    super();
    this._subscribe();    
  }

  handleStorageEvent = (event) => {
    this._loadFromLocalStorage();
    this.dispatchUpdate();
  }

  addTodo(options) {
    this.todos.push(new Todo(options));
  }

  load() {
    this._loadFromLocalStorage();
    return this.todos;
  }

  _loadFromLocalStorage() {
    const stringData = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
    const todoData = JSON.parse(stringData) || {};
    this.todos = todoData;
  }

  _saveToLocalStorage() {
    this._unsubscribe();
    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
    this._subscribe();
    this.dispatchUpdate();
  }

  save() {
    this._saveToLocalStorage();
  }

  upsertTodo({ year, month, day}, todo) {

    const dayTodos = Array.from(get(this.todos, [year, month, day], []));
    const todoIndex = findIndex(dayTodos, { id: todo.id });

    if (todoIndex > -1) {
      dayTodos[todoIndex] = todo;
    } else {
      dayTodos.push(todo);
    }

    this.todos = {
      ...this.todos,
      [year]: {
        ...get(this.todos, [year], {}),
        [month]: {
          ...get(this.todos, [ year, month ], {}),
          [day]: dayTodos,
        }
      }
    }
    this.save();
  }

  removeById({ year, month, day }, todo) {
    const dayTodos = Array.from(get(this.todos, [year, month, day], []));
    const currentTodo = reject(dayTodos, { id: todo.id });

    this.todos = {
      ...this.todos,
      [year]: {
        ...get(this.todos, [year], {}),
        [month]: {
          ...get(this.todos, [ year, month ], {}),
          [day]: currentTodo,
        }
      }
    }

    this.save();
  }
  
  dispatchUpdate() {
    this.dispatchEvent(new Event('update'));
  }

  _subscribe() {
    window.addEventListener('storage', this.handleStorageEvent);
  }

  _unsubscribe() {
    window.removeEventListener('storage', this.handleStorageEvent);
  }

}

export const todoService = new TodoService();
