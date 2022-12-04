import { useRef } from 'react';

import { TodoItem } from '.';

type TodoFormType = {
  setNewTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>,
}

function TodoForm(props: TodoFormType) {
  const { setNewTodo } = props;
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <form onSubmit={addTodo}>
        <input type='text' ref={inputRef} />
        <button type='submit'>Add</button>
      </form>
  )
}

export default TodoForm;
