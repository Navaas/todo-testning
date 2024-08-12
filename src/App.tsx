import { useState } from "react";
import "./App.css";
import DeleteButton from "./components/DeleteButton/DeleteButton";
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
          <div className="my-2">
            <span key={todo} className="mx-4">
              {todo}
            </span>
            <DeleteButton />
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
