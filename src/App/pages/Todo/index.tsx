import { useState } from 'react';
import { Link } from 'react-router-dom';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

export type TodoItem = {
  text: string;
  isComplete: boolean;
  id: number;
}

function Todo() {
  const [todoList, setNewTodo] = useState<TodoItem[]>([]);

  return (
    <>
      <h1>Todo List</h1>
      <Link to='/'>Back to home</Link>
      <TodoForm 
        setNewTodo={setNewTodo}
      />
      <TodoList 
        todoList={todoList}
        setNewTodo={setNewTodo}
      />
    </>
  )
}

export default Todo;
