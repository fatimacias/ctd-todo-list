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
      title,
      isCompleted : false
    };
    setTodoList([...todoList,newTodo]);
  }

  function completeTodo(id)
  {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? {...todo, isCompleted:true} : todo
    );
    setTodoList(updatedTodos);
  }
  
  return(
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}></TodoList>
    </main>
  )
}

export default App
