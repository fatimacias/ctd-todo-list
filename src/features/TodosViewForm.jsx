import { useEffect, useState } from "react";
import styled from 'styled-components';

const StyledForm = styled.form`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding: 8px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: var(--radius, 6px);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--brand, #2563eb);
    box-shadow: 0 0 3px rgba(37, 99, 235, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledSelect = styled.select`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: var(--radius, 6px);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--brand, #2563eb);
    box-shadow: 0 0 3px rgba(37, 99, 235, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: var(--radius, 6px);
  padding: 8px 12px;
  background: var(--brand, #2563eb);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--fg, #1f2937);
  margin-bottom: 2px;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export default function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      <Row>
        <Label htmlFor="search">Search todos:</Label>
        <StyledInput
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
          placeholder="Type to filter by title..."
        />
        <StyledButton
          type="button"
          onClick={() => {
            setLocalQueryString("");
            setQueryString("");
          }}
          title="Clear search"
        >
          Clear
        </StyledButton>
      </Row>

      <Row>
        <Label htmlFor="sortField">Sort by</Label>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <Label htmlFor="sortDirection">Direction</Label>
        <StyledSelect
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </Row>
    </StyledForm>
  );
}
