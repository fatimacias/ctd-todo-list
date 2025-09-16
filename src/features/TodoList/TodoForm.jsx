import { useState } from "react";
import styled from 'styled-components';
import TextInputWithLabel from "../../shared/TextInputWithLabel";

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 8px;
  background: white;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 8px; 
  background: white;
  border-radius: 8px;
`;

const StyledButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background: var(--brand, #0077ff);
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    background: #bbb;
    cursor: not-allowed;
    font-style: italic; 
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  function handleAddTodo(event) 
  {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        value={workingTodoTitle}
        label= "Todo"
        elementId = "todoTitle"
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />
      <StyledButton type="submit" disabled={workingTodoTitle.trim() === ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
