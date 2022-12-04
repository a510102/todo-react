import { useState } from 'react';

import { TodoItem } from '.';

type TodoListType = {
  todoList: TodoItem[],
  setNewTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>,
}

enum TodoStatusType {
  all = 'All',
  complate = 'Complate',
  undo = 'Undo', 
}

function TodoList(props: TodoListType) {
  const { todoList, setNewTodo } = props;
  const [todoStatus, setTodoStatus] = useState<TodoStatusType>(TodoStatusType.all);

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
      {
        todoList.length > 0 
          ? (
            <>
              <ul>
                {statusList.map((state, i) => <li key={i} onClick={() => changeState(state)}>{state}</li>)}
              </ul>
              <ul>
                {filterTodoList.map(todo => (
                  <Todo 
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo} />
                ))}
              </ul>
            </>
          ) 
          : null 
      }
    </>
    
  )
}

type TodoType = {
  todo: TodoItem,
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
}

function Todo(props: TodoType) {
  const { todo, toggleTodo, deleteTodo } = props;

  return (
    <li key={todo.id}>
      <p>{todo.text}</p>
      <button type='button' onClick={() => toggleTodo(todo.id)}>{todo.isComplete ? 'Undo' : 'Done'}</button>
      <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoList;
