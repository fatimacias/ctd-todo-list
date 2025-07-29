import TodoListItem from "./TodoListItem";

function TodoList({todos}){
  return(
    <ul>
      {todos.map((todo)=>{
        return(
          <TodoListItem
            key={todo.id}
            title = {todo.title}
          />
        );
      })}
    </ul>
  );
}

export default TodoList