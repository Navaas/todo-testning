import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <>
      <h1>Kom-ihåg-lista</h1>
      <TodoForm onSubmit={(text) => setTodos([...todos, text])} />
      {/* Skriv ut listan */}
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
