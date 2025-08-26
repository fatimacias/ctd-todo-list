import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoForm({onAddTodo,isSaving}){

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
                {isSaving ? 'Saving...' : 'Add Todo'}
            </button>
        </form>        
    );
}

export default TodoForm;