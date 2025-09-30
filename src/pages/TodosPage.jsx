import TodoForm from "../features/TodoList/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";


export default function TodosPage({ 
    addTodo, 
    isSaving,
    todoList, 
    onCompleteTodo,
    onUpdateTodo, 
    isLoading,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    queryString,
    setQueryString}){
        return(
            <>
                <TodoForm onAddTodo={addTodo} 
                    isSaving = {isSaving}
                />
                <TodoList todoList={todoList} 
                    onCompleteTodo={onCompleteTodo}
                    onUpdateTodo = {onUpdateTodo}
                    isLoading = {isLoading}
                />               

                <TodosViewForm sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    queryString={queryString}
                    setQueryString={setQueryString}
                />
            </>
        )
    }