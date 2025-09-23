import { useCallback, useEffect, useState } from 'react';
import './App.css';
import styles from './App.module.css';
import TodoForm from './features/TodoList/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import Header from './Header';
import { encodeUrlClient, getFetch, patchFetch, postFetch } from "./shared/airtableClient";
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

  const [sortField, setSortField] = useState("createdTime"); 
  const [sortDirection, setSortDirection] = useState("desc"); 
  const [queryString, setQueryString] = useState("");

  const encodeUrl = useCallback(()=>{
     return encodeUrlClient(sortField,sortDirection,queryString)
  },[sortField, sortDirection, queryString]);

  useEffect(()=> {
    const fetchTodos = async () => {
      setIsLoading(true);      
      try{
        const data = await getFetch(encodeUrl());
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
  },[encodeUrl])

  const refreshList = async () => {
    try {
      const data = await getFetch(encodeUrl());
      setTodoList(mapRecordsToTodos(data.records));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const addTodo = async(title) =>
  {
    try{
      setIsSaving(true);
      const payload = toCreatePayload(title);
      const data = await postFetch(payload);
      const [created] = mapRecordsToTodos(data.records);
      setTodoList((prev) => [...prev, created]);
      await refreshList();
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
      await refreshList();
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
      await refreshList();
    } catch (err) {
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === original.id ? original : todo))
      );
    }
  };

  return(
    <div className={styles.appShell}>
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo} 
      isSaving = {isSaving}/>
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo}
        onUpdateTodo = {updateTodo}
        isLoading = {isLoading}></TodoList>

      <hr/>

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      >
      </TodosViewForm>
     {errorMessage && (
      <div className={`error-banner ${styles.errorBox}`} role="alert" aria-live="assertive">
        <hr />
        <p>{errorMessage}</p>
        <button onClick={() => setErrorMessage("")}>Dismiss</button>
      </div>
)}
    </main>
  </div>
  )
}

export default App
