import { useState } from 'react';
import './App.css';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title)
  {
    const newTodo = {
      id : Date.now(),
      title
    };
    setTodoList([...todoList,newTodo]);
  }
  return(
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}></TodoList>
    </main>
  )
}

export default App
