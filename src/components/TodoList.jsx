import React, { useState } from 'react';

const TodoList = ({ todos, userId, onAddTodo, onDeleteTodo, onToggleCompleted }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(userId, newTodo);
      setNewTodo('');
    }
  };

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div>
      <h2>Todos:</h2>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={newTodo} onChange={handleTodoChange} placeholder="Add Todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggleCompleted(todo.id)} />
            {todo.title}
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
