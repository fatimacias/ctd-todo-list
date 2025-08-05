import { useState } from 'react';
import './App.css';
import todoData from './assets/data.json';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
function App() {
  const [todo, setTodo] = useState(todoData.todo);
  const [newTodo, setNewTodo] = useState('Add new todo');
  return(
     <main>
      <Header/>
      <TodoForm/>
      <p>{newTodo}</p>
      <TodoList todos={todo}></TodoList>
    </main>
  )
}

export default App
