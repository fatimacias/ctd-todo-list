import { useCallback, useEffect, useReducer, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import styles from './App.module.css';
import About from './pages/About';
import NotFound from './pages/NotFound';
import TodosPage from './pages/TodosPage';
import {
  initialState as initialTodosState,
  actions as todoActions,
  reducer as todosReducer
} from './reducers/todos.reducer';
import Header from './shared/Header';
import { encodeUrlClient, getFetch, patchFetch, postFetch } from "./shared/airtableClient";
import {
  toCompletePayload,
  toCreatePayload,
  toUpdatePayload
} from "./shared/todoMapping";

function App() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Todo List");
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState)

  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("Todo List");
    } else if (location.pathname === "/about") {
      setPageTitle("About");
    } else {
      setPageTitle("Not Found");
    }
  }, [location]); 

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
      <Header title={pageTitle}/>
      <Routes>
        <Route path="/" 
          element={
            <>
            <TodosPage
              addTodo={addTodo}
              isSaving = {todoState.isSaving}
              todoList={todoState.todoList} 
              onCompleteTodo={completeTodo}
              onUpdateTodo = {updateTodo}
              isLoading = {todoState.isLoading}
              sortField={todoState.sortField}
              setSortField={(value) => dispatch({ type: todoActions.setSortField, value })}
              sortDirection={todoState.sortDirection}
              setSortDirection={(value) => dispatch({ type: todoActions.setSortDirection, value })}
              queryString={todoState.queryString}
              setQueryString={(value) => dispatch({ type: todoActions.setQueryString, value })}
            />
            {todoState.errorMessage && (
            <div className={`error-banner ${styles.errorBox}`} role="alert" aria-live="assertive">
              <hr />
              <p>{todoState.errorMessage}</p>
              <button onClick={() => dispatch({ type: todoActions.clearError })}>
                Dismiss
              </button>
            </div>
          )}
          </>
          }
        />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>      
    </main>
  </div>
  )
}

export default App
