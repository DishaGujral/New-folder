import React from 'react';

const Todo = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  const handleToggleCompleted = () => {
    onToggleCompleted(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggleCompleted} />
      <span>{todo.title}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
    </li>
  );
};

export default Todo;
