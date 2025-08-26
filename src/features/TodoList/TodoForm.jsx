import { useState } from "react";
import TextInputWithLabel from "../../shrared/TextInputWithLabel";

function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    function handleAddTodo(event)
    {
        event.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle("");
    }

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
                value={workingTodoTitle}
                label= "Todo"
                elementId = "todoTitle"
                onChange={(e) => setWorkingTodoTitle(e.target.value)} />

            <button type="submit" disabled={workingTodoTitle.trim() === ""}>
                Add Todo
            </button>
        </form>        
    );
}

export default TodoForm;