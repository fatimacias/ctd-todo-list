import { useState } from 'react';
import './App.css';
import TodoForm from './features/TodoList/TodoForm';
import TodoList from './features/TodoList/TodoList';
import Header from './Header';
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
  
  function updateTodo(editedTodo)
  {
    const updated = todoList.map((todo) =>
      todo.id === editedTodo.id ? {...editedTodo} : todo
    );
    setTodoList(updated);
  }
  return(
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo}
        onUpdateTodo = {updateTodo}></TodoList>
    </main>
  )
}

export default App
