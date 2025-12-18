import { useState } from "react";
import styled from 'styled-components';
import TextInputWithLabel from "../../shared/TextInputWithLabel";

const StyledForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: var(--radius, 8px);
  border: 1px solid #e5e7eb;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius, 6px);
  background: var(--brand, #2563eb);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  height: 44px;
  min-width: 100px;

  &:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 48px;
    font-size: 16px;
  }
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        value={workingTodoTitle}
        label="Todo"
        elementId="todoTitle"
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Enter a new todo..."
      />
      <StyledButton type="submit" disabled={workingTodoTitle.trim() === ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
