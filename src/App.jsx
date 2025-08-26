import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoList/TodoForm';
import TodoList from './features/TodoList/TodoList';
import Header from './Header';
import { getFetch, patchFetch, postFetch } from "./shared/airtableClient";
import {
  mapRecordsToTodos,
  toCompletePayload,
  toCreatePayload,
  toUpdatePayload
} from "./shared/todoMapping";


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(()=> {
    const fetchTodos = async () => {
      setIsLoading(true);      
      try{
        const data = await getFetch();
        setTodoList(mapRecordsToTodos(data.records));
      }
      catch(error){
        setErrorMessage(error.message);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchTodos();
  },[])

  const addTodo = async(title) =>
  {
    try{
      setIsSaving(true);
      const payload = toCreatePayload(title);
      const data = await postFetch(payload);
      const [created] = mapRecordsToTodos(data.records);
      setTodoList((prev) => [...prev, created]);
    }
    catch(error){
      console.log(error);
      setErrorMessage(error.message);
    }
    finally{
      setIsSaving(false);
    }
  }

  const completeTodo = async (id) => {
    const original = todoList.find((t) => t.id === id);
    if (!original) return;

    const nextCompleted = !original.isCompleted;

    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: nextCompleted } : t))
    );

    try {
      const payload = toCompletePayload(id);
      await patchFetch(payload);
    } catch (err) {
      setErrorMessage(`${err.message}. Reverting completion...`);
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === original.id ? original : todo))
      );
    }
  };

  
  const updateTodo = async (edited) => {
    const original = todoList.find((todo) => todo.id === edited.id);
    if (!original) return;

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === edited.id ? { ...todo, title: edited.title } : todo))
    );

    try {
      const payload = toUpdatePayload({
        id: edited.id,
        title: edited.title,
        isCompleted: edited.isCompleted,
      });
      await patchFetch(payload);
    } catch (err) {
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === original.id ? original : todo))
      );
    }
  };

  return(
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo} 
      isSaving = {isSaving}/>
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo}
        onUpdateTodo = {updateTodo}
        isLoading = {isLoading}></TodoList>
     {errorMessage && (
      <div className="error-banner" role="alert" aria-live="assertive">
        <hr />
        <p>{errorMessage}</p>
        <button onClick={() => setErrorMessage("")}>Dismiss</button>
      </div>
)}
    </main>
  )
}

export default App
