import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

type TodoItem = {
  text: string;
  isComplete: boolean;
  id: number;
}

enum TodoStatusType {
  all = 'All',
  complate = 'Complate',
  undo = 'Undo', 
}

function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setNewTodo] = useState<TodoItem[]>([]);
  const [todoStatus, setTodoStatus] = useState<TodoStatusType>(TodoStatusType.all);

  const addTodo = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const newTodoText = inputRef.current;
    if (!newTodoText) return;
    const newTodo: TodoItem = {
      id: Date.now(),
      text: newTodoText.value,
      isComplete: false,
    }
    setNewTodo(preTodo => [...preTodo, newTodo]);
    inputRef.current.value = '';
  };

  const toggleTodo = (todoId: number):void => {
    const newTodo = todoList.map(todo => todo.id === todoId ? {...todo, isComplete: !todo.isComplete} : todo);
    setNewTodo(preTodo => newTodo);
  };

  const deleteTodo = (todoId: number):void => {
    const newTodo = todoList.filter(todo => todo.id !== todoId);
    setNewTodo(preTodo => newTodo);
  };

  const changeState = (status: TodoStatusType):void => {
    setTodoStatus(pre => status);
  }

  const statusList = [TodoStatusType.all, TodoStatusType.complate, TodoStatusType.undo];

  const filterTodoList = todoStatus === TodoStatusType.all 
    ? todoList 
    : todoList.filter(todo => {
      if (todoStatus === TodoStatusType.complate && todo.isComplete) return todo;
      if (todoStatus === TodoStatusType.undo && !todo.isComplete) return todo;
    });

  return (
    <>
      <h1>Todo List</h1>
      <Link to='/'>Back to home</Link>
      <form onSubmit={addTodo}>
        <input type='text' ref={inputRef} />
        <button type='submit'>Add</button>
      </form>
      {
        todoList.length > 0 
          ? (
            <>
              <ul>
                {statusList.map((state, i) => <li key={i} onClick={() => changeState(state)}>{state}</li>)}
              </ul>
              <ul>
                {filterTodoList.map(todo => (
                  <li key={todo.id}>
                    <p>{todo.text}</p>
                    <button type='button' onClick={() => toggleTodo(todo.id)}>{todo.isComplete ? 'Undo' : 'Done'}</button>
                    <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </>
          ) 
          : null 
      }
    </>
  )
}

export default Todo;
