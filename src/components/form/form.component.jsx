import React, { Component } from 'react';
import './form.component.css';

export default class FormComponent extends Component {
  render() {
    const { currentTodo, handleSubmit, handleTitleChange, handleDescriptionChange } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='title'
          value={currentTodo.title}
          onChange={handleTitleChange}
        />
        <input 
          type='text'
          name='description'
          value={currentTodo.description}
          onChange={handleDescriptionChange}
        />
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}