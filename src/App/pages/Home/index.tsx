import { Link } from 'react-router-dom';

function Todo() {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/todo">Todo List</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Todo;
