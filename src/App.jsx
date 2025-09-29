import { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import styles from './App.module.css';
import TodoForm from './features/TodoList/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import Header from './Header';
import { encodeUrlClient, getFetch, patchFetch, postFetch } from "./shared/airtableClient";
import {
  toCompletePayload,
  toCreatePayload,
  toUpdatePayload
} from "./shared/todoMapping";

import {
  initialState as initialTodosState,
  actions as todoActions,
  reducer as todosReducer
} from './reducers/todos.reducer';

function App() {

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState)

  const encodeUrl = useCallback(()=>{
     return encodeUrlClient(todoState.sortField,todoState.sortDirection,todoState.queryString)
  },[todoState.sortField, todoState.sortDirection, todoState.queryString]);

  useEffect(()=> {
    let aborted = false;
    const fetchTodos = async () => {
      dispatch({type : todoActions.fetchTodos});

      try{
        const data = await getFetch(encodeUrl());
        if (!aborted) {
          dispatch({ type: todoActions.loadTodos, records: data.records });
        }
      }
      catch(error){
        dispatch({type : todoActions.setLoadError, error});
      }
      finally{
        dispatch({type : todoActions.endRequest});
      }
    };
    fetchTodos();
    return () => { aborted = true; };
  },[encodeUrl])

  const refreshList = async () => {
    try {
      const data = await getFetch(encodeUrl());
      dispatch({type : todoActions.loadTodos, records:data.records});
    } catch (error) {
      dispatch({type : todoActions.setLoadError, error: error.message});
    }
  };

  const addTodo = async(title) =>
  {
    try{
      dispatch({type : todoActions.startRequest});
      const payload = toCreatePayload(title);
      const data = await postFetch(payload);
      dispatch({ type: todoActions.addTodo, records: data.records });
      await refreshList();
    }
    catch(error){
      dispatch({type : todoActions.setLoadError, error});
    }
    finally{
      dispatch({type : todoActions.endRequest});
    }
  }

  const completeTodo = async (id) => {
    const original = todoState.todoList.find((t) => t.id === id);
    if (!original) return;

    dispatch({ type: todoActions.completeTodo, id });

    try {
      const payload = toCompletePayload(id);
      await patchFetch(payload);
      await refreshList();
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error: new Error(`${error.message}. Reverting completion...`)
      });
      dispatch({ type: todoActions.revertTodo, originalTodo: original });
    }
  };

  
  const updateTodo = async (edited) => {
    const original = todoState.todoList.find((todo) => todo.id === edited.id);
    if (!original) return;

    dispatch({ type: todoActions.updateTodo, editedTodo: { id: edited.id, title: edited.title } });


    try {
      const payload = toUpdatePayload({
        id: edited.id,
        title: edited.title,
        isCompleted: edited.isCompleted,
      });
      await patchFetch(payload);
      await refreshList();
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error: new Error(`${error.message}. Reverting todo...`)
      });
      dispatch({ type: todoActions.revertTodo, originalTodo: original });
    }
  };

  return(
    <div className={styles.appShell}>
     <main>
      <Header/>
      <TodoForm onAddTodo={addTodo} 
      isSaving = {todoState.isSaving}/>
      <TodoList 
        todoList={todoState.todoList} 
        onCompleteTodo={completeTodo}
        onUpdateTodo = {updateTodo}
        isLoading = {todoState.isLoading}></TodoList>

      <hr/>

      <TodosViewForm
        sortField={todoState.sortField}
        setSortField={(value) => dispatch({ type: todoActions.setSortField, value })}
        sortDirection={todoState.sortDirection}
        setSortDirection={(value) => dispatch({ type: todoActions.setSortDirection, value })}
        queryString={todoState.queryString}
        setQueryString={(value) => dispatch({ type: todoActions.setQueryString, value })}
      >
      </TodosViewForm>
     {todoState.errorMessage && (
      <div className={`error-banner ${styles.errorBox}`} role="alert" aria-live="assertive">
        <hr />
        <p>{todoState.errorMessage}</p>
        <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss
        </button>
      </div>
)}
    </main>
  </div>
  )
}

export default App
