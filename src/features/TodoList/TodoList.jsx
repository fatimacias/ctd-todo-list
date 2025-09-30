import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import styles from './TodoList.module.css';
import TodoListItem from "./TodoListItem";


function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo)=> !todo.isCompleted);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const todosToShow = filteredTodoList.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  };

  useEffect(() => {
  if (totalPages > 0) {
    if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
      navigate("/");
    }
  }
}, [currentPage, totalPages, navigate]);


  return (
    <>      
      {isLoading && (
         <div className={styles.loading}>
           <p>Loading todos...</p>
         </div>
      )}
      
      {!isLoading && todosToShow.length >= 1 && (
        <>
          <ul className={styles.list}>
            {todosToShow.map(todo => (
              <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} />
            ))}
          </ul>
          <div className={styles.paginationControls}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
      
      {!isLoading && todosToShow.length === 0 && (
        <div className={styles.empty}>
          <h3>No todos yet</h3>
          <p>Add a todo above to get started!</p>
        </div>
      )}
    </>
  );
}

export default TodoList;
