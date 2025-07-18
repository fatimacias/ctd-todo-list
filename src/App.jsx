import './App.css'

function App() {
  const todos=[
    {id: 1, title: "Review resources"},
    {id: 2, title: "Take notes"},
    {id: 3, title: "Code out app"},
  ]
  return(
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map(todo=> <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
