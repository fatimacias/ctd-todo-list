import { useEffect, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [workingTitle, setWorkingTitle] = useState(todo.title)

  function handleEditChange(event)
  {
    setWorkingTitle(event.target.value);
  }

  
  function handleCancel()
  {
    setWorkingTitle(todo.title);
    setIsEditing(false);    
  }

  function handleUpdate(event)
  {
    if(!isEditing)
      return;
    
    event.preventDefault();
    onUpdateTodo({...todo, title: workingTitle});
    setIsEditing(false);
  }

   useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  return (
    <li className={styles.item}>
      <form>
        {isEditing ? (
          <>
          <TextInputWithLabel 
            value={workingTitle}
            onChange={handleEditChange} />
          <div className={styles.buttonGroup}>
              <button type="button" onClick={handleCancel}>Cancel</button>
              <button type="button" onClick={handleUpdate}>Update</button>
            </div>
          </>
          
        )
        : (
          <>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                id = {`checkbox${todo.id}`}
                checked = {todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;