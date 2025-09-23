import { useEffect, useState } from "react";
import styled from 'styled-components';

const StyledForm = styled.form`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding: 8px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const StyledSelect = styled.select`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  background: var(--brand, #0077ff);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
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
        <label htmlFor="search">Search todos:</label>
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
        <label htmlFor="sortField">Sort by</label>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <label htmlFor="sortDirection">Direction</label>
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
