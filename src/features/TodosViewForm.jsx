export default function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  return (
    <form onSubmit={preventRefresh} style={{ display: "grid", gap: "0.75rem" , marginTop:"0.75rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label htmlFor="search">Search todos:</label>
        <input
          id="search"
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          placeholder="Type to filter by title..."
        />
        <button type="button" onClick={() => setQueryString("")}>
          Clear
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <label htmlFor="sortField">Sort by</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="sortDirection">Direction</label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}
